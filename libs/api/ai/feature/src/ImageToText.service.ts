import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ImageToTextService {
  private readonly apiKey: string;
  private readonly apiUrl: string;

  constructor() {
    this.apiKey = process.env['GOOGLE_API_KEY'] || '';
    this.apiUrl = 'https://vision.googleapis.com/v1/images:annotate';
  }

  async analyzeImages(imageUrls: string[]) {
    const uniqueLabelDescriptions = new Set<string>();
    let bestDominantColor: { red: number, green: number, blue: number } = { red: 0, green: 0, blue: 0 };
    let bestScore = -1;


    for (const imageUri of imageUrls) {
      try {
        const response = await axios.post(
          `${this.apiUrl}?key=${this.apiKey}`,
          {
            requests: [
              {
                image: {
                  source: {
                    imageUri,
                  },
                },
                features: [
                  {
                    type: 'LABEL_DETECTION',
                    maxResults: 20,
                  },
                  {
                    type: 'IMAGE_PROPERTIES',
                  },
                ],
              },
            ],
          }
        );

        const [result] = response.data.responses;
        const labels = result.labelAnnotations || [];
        const imageProperties = result.imagePropertiesAnnotation || {};

        labels.forEach((label: { description: string }) => {
          const description = label.description;
          uniqueLabelDescriptions.add(description);
        });

        // Find and extract the RGB values of the dominant color with the best score
        const dominantColors = imageProperties.dominantColors?.colors || [];
        dominantColors.sort((a: { score: number }, b: { score: number }) => b.score - a.score);
        if (dominantColors[0]?.score > bestScore) {
          bestDominantColor = { ...dominantColors[0].color };
          bestScore = dominantColors[0].score;
        }
      } catch (error) {
        console.error('Google Vision API error:', error);
        throw error;
      }
    }

    return {
      labelDescriptions: Array.from(uniqueLabelDescriptions),
      bestDominantColor,
    };
  }
}