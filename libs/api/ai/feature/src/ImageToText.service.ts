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
    const results = [];

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
                    maxResults: 10,
                  },
                  {
                    type: 'IMAGE_PROPERTIES',
                  },
                  {
                    type: 'OBJECT_LOCALIZATION',
                  },
                ],
              },
            ],
          }
        );

        const [result] = response.data.responses;
        const labels = result.labelAnnotations || [];
        const imageProperties = result.imagePropertiesAnnotation || {};
        const objectLocalization = result.localizedObjectAnnotations || [];

        results.push({
          labels,
          imageProperties,
          objectLocalization,
        });
      } catch (error) {
        console.error('Google Vision API error:', error);
        throw error;
      }
    }

    return results;
  }
}
