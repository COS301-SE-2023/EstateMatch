import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ImageToTextService {
  private readonly apiKey: string;
  private readonly apiUrl: string;

  private readonly vagueLabels: string[] = 
  [
  "Furniture", 
  "Houseplant",
  "Table",
  "Interior design",
  "Bookcase",
  "Floor",
  "Flooring",
  "Wood",
  "Real estate",
  "Hall",
  "Chair",
  "Desk",
  "Engineering",
  "Stairs",
  "Ceiling",
  "Shelving",
  "Houseplant",
  "Design",
  "Automotive design",
  "Beam",
  "Building",
  "Architecture",
  "Couch",
  "studio couch",
  "Room",
  "Sofa bed",
  "Aluminium",
  "Leisure",
  "Facade",
  "Publication",
  "City",
  "Space",
  "Luxury vehicle",
  "Living room",
  "Machine",
  "Retail",
  "Metal",
  "Glass",
  "Shelf",
  "Mirror",
  "Bathtub",
  "Plumbing fixture",
  "Tap",
  "Property",
  "Bathroom cabinet",
  "Plant",
  "Sink",
  "Bathroom",
  "Fixture",
  "Fluid",
  "Wall",
  "Plumbing",
  "Cabinetry",
  "Composite material",
  "House",
  "Bathroom accessory",
  "Bathroom sink",
  "Rectangle",
  "Bathtub spout",
  "Household hardware",
  "Road surface",
  "Tree",
  "Cloud",
  "Asphalt",
  "Sky",
  "Garage door",
  "Grass",
  "Brickwork",
  "Brick",
  "Landscape",
  "Roof",
  "Slope",
  "Door",
  "Window",
  "Siding",
  "Sidewalk",
  "Concrete",
  "Land lot",
  "Arecales",
  "Shrub",
  "Groundcover",
  "Cottage",
  "Lawn",
  "Landscaping",
  "Eco hotel",
  "Home",
  "Palm tree",
  "Walkway",
  "Gardening",
  "Plantation",
  "Fence",
  "Grass family",
  "Home fencing",
  "Grassland",
  "Shade",
  "Soil",
  "Pasture",
  "Outdoor structure",
  "Outdoor furniture",
  "Pillow",
  "Comfort",
  "Condominium",
  "Flowerpot",
  "Mixed-use",
  "Handrail",
  "Art",
  "Tints and shades",
  "Baluster",
  "Window treatment",
  "Lighting",
  "Grey",
  "Decoration",
  "Coffee table",
  "Lamp",
  "Picture frame",
  "Event",
  "Curtain",
  "Window blind",
  "Den",
  "Window covering",
  "Flower",
  "Vase",
  "Chandelier",
  "Molding",
  "Bottle",
  "Collection",
  "Barware",
  "Liquor store",
  "Countertop",
  "Kitchen sink",
  "Kitchen stove",
  "Kitchen",
  "Kitchen appliance",
  "Home appliance",
  "Stove",
  "Major appliance",
  "Material property",
  "Cooktop",
  "Wood stain",
  "Gas",
  "Gas stove",
  "Drawer",
  "Cuisine",
  "Microwave oven",
  "Cupboard",
  "Light fixture",
  "Fruit",
  "Bed frame",
  "Bed",
  "Linens",
  "Bedding",
  "Bedroom",
  "Mattress",
  "Bed sheet",
  "Mattress pad",
  "Home door",
  "Plaster",
  "Nightstand",
  "Toilet",
  "Ceramic",
  "Household supply",
  "Toilet seat",
  "Shower head",
  "Plumbing fitting",
  "Window valance",
  "Twig",
  "Sash window",
  "Peach",
  "Pattern",
  "Chest of drawers",
  "Chest",
  "Hardwood"
];

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
                    maxResults: 30,
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
          if (!this.vagueLabels.includes(description)) {
            uniqueLabelDescriptions.add(description);
          }
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