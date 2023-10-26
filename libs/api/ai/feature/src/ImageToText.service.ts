import { AIPreferencesRepository } from '@estate-match/api/prefrences/data-access';
import { IAIPreference } from '@estate-match/api/prefrences/util';
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
  "Sash window",
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
  "Peach",
  "Pattern",
  "Chest of drawers",
  "Chest",
  "Vehicle",
  "Wheel",
  "Thoroughfare",
  "Road",
  "Tower block",
  "Car",
  "Pedestrian",
  "Street light",
  "Street",
  "Lane",
  "Spring",
  "World",
  "Display device",
  "Flat panel display",
  "Advertising",
  "Signage",
  "Electric blue",
  "Poster",
  "Font",
  "Visual arts",
  "Mural",
  "Billboard",
  "Painting",
  "Banner",
  "Graphics",
  "Graffiti",
  "Tourism",
  "Tire",
  "Headquarters",
  "Downtown",
  "Parking",
  "Automotive parking light",
  "Automotive lighting",
  "Motor vehicle",
  "Automotive tire",
  "Automotive tail & brake light",
  "Alloy wheel",
  "Personal luxury car",
  "Automotive exterior",
  "Rim",
  "Vehicle door",
  "Automotive wheel system",
  "Mid-size car",
  "Family car",
  "Full-size car",
  "Hubcap",
  "Trunk",
  "Bumper",
  "Electrical supply",
  "Steel",
  "Daylighting",
  "Electrical wiring",
  "Electricity",
  "Alarm device",
  "Basement",
  "Factory",
  "Computer monitor",
  "Computer keyboard",
  "Personal computer",
  "Office chair",
  "Peripheral",
  "Computer",
  "Computer desk",
  "Writing desk",
  "Office supplies",
  "Office equipment",
  "Industry",
  "Aisle",
  "Library",
  "Eyewear",
  "Horizon",
  "Bridge",
  "Boardwalk",
  "Dock",
  "Fixed link",
  "Coast",
  "Ocean",
  "Guard rail",
  "Nonbuilding structure",
  "Port",
  "Channel",
  "Concrete bridge",
  "Mountain",
  "Overpass",
  "Freeway",
  "Highway",
  "Mountain range",
  "Tower",
  "Winter",
  "Bird's-eye view",
  "Aerial photography",
  "Panorama",
  "Bench",
  "Recreation room",
  "Human settlement",
  "Daytime",
  "Azure",
  "Resort",
  "Driveway",
  "Infrastructure",
  "Alley",
  "Public space",
  "Morning",
  "Tar",
  "Flag",
  "Vacation",
  "Tourist attraction",
  "Plaza",
  "Plant community",
  "Botany",
  "Leaf",
  "Vegetation",
  "Biome",
  "Woody plant",
  "Terrestrial plant",
  "Evergreen",
  "Flowering plant",
  "Annual plant",
  "Desert Palm",
  "Attalea speciosa",
  "Tropics",
  "Shrubland",
  "Pine",
  "Sabal palmetto",
  "Pine family",
  "Elaeis",
  "Television",
  "Entertainment center",
  "Television set",
  "Book",
  "Exhaust hood",
  "Dead bolt",
  "Handle",
  "Door handle",
  "Paint",
  "Varnish",
  "Latch",
  "Hinge",
  "Sunlight",
  "Forest",
  "Jungle",
  "Vascular plant",
  "Conifer",
  "Water",
  "Line",
  "Symmetry",
  "Fountain",
  "Resort town",
  "Christmas tree",
  "Christmas ornament",
  "Ornament",
  "Christmas decoration",
  "Holiday ornament",
  "Holiday",
  "Christmas",
  "Christmas eve",
  "Building material",
  "Shower",
  "Restroom",
  "Hand dryer",
  "Paper product",
  "Cleanliness",
  "Paper",
  "Purple",
  "Estate",
  "Ladder",
  "Musical instrument",
  "Musical keyboard",
  "Plucked string instruments",
  "String instrument",
  "Violin family",
  "Cello",
  "Bass violin",
  "Lobby",
  "Classic",
  "Hill",
  "Cumulus",
  "Summer",
  "Cityscape",
  "Truck",
  "Van",
  "Beauty",
  "White",
  "Oval",
  "Grille",
  "Electronic device",
  "Audio equipment",
  "Fluorescent lamp",
  "Musical instrument accessory",
  "Electronic instrument",
  "Square",
  "Monochrome photography",
  "Monochrome",
  "Parking lot",
  "Shadow",
  "Red",
  "Lifebuoy",
  "Cement",
  "Auto part",
  "Blue",
  "Armrest",
  "Plank",
  "Magenta",
  "Office",
  "Exhibition",
  "Modern art",
  "Circle",
  "Smoke detector",
  "Product",
  "Desktop computer",
  "Technology",
  "Input device",
  "Job",
  "Gloss",
  "Aqua",
  "Computer monitor accessory",
  "Dishwasher",
  "Kitchen & dining room table",
  "Dishware",
  "Tablecloth",
  "Tableware",
  "Beige",
  "Throw pillow",
  "Textile",
  "Shower panel",
  "Shower bar",
  "Shower door",
  "Monochrome photography",
  "Transparent material",
  "Clock",
  "Light",
  "Logo",
  "Night",
  "Meadow",
  "Hedge",
  "Yellow",
  "Illustration",
  "Green",
  "Orange",
  "Toaster",
  "Skyscraper",
  "Land vehicle",
  "Freezing",
  "Public utility",
  "Hood",
  "Spoiler",
  "Rolling",
  "Vehicle registration plate",
  "Kit car",
  "Performance car",
  "Sports car",
  "Column",
  "Executive car",
  "Mold",
  "Light switch",
  "Triangle",
  "Lumber",
  "History",
  "Flagstone",
  "Village",
  "Rose",
  "Petal",
  "Dresser",
  "Umbrella",
  "Fashion accessory",
  "Apartment",
];

  constructor(private readonly aiPreferenceRepo: AIPreferencesRepository) {
    this.apiKey = process.env['GOOGLE_API_KEY'] || '';
    this.apiUrl = 'https://vision.googleapis.com/v1/images:annotate';
  }

    async analyzeImages(imageUrls: string[], username :string) { //pass in username
      const uniqueLabelDescriptions = new Set<string>();
      let allDominantColors: { red: number; green: number; blue: number;  score: number}[] = [];

      const apiCalls = imageUrls.map(async (imageUri) => {
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
                      maxResults: 27,
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

          labels
          .filter((label: { description: string }) => !this.vagueLabels.includes(label.description))
          .forEach((label: { description: string }) => {
            uniqueLabelDescriptions.add(label.description);
          });

          

          // Find and extract the RGB values of the dominant color with the best score
          const dominantColors = imageProperties.dominantColors?.colors || [];
          allDominantColors = allDominantColors.concat(
            dominantColors.map((color: { color: { red: number; green: number; blue: number }; score: number }) => ({
              red: color.color.red,
              green: color.color.green,
              blue: color.color.blue,
              score: color.score,
            }))
          );
        } catch (error) {
          console.error('Google Vision API error:', error);
          throw error;
        }
      });

      await Promise.all(apiCalls);

      allDominantColors.sort((a, b) => b.score - a.score);

      // Take the top 5 dominant colors based on score
      const topDominantColors = allDominantColors.slice(0, 5);

      const rgbValues: number[] = [];

      topDominantColors.forEach(color => {
        rgbValues.push(color.red, color.green, color.blue);
      });

      //Query DB
      /**
       * Check if user have ai model by findOne(username)
       * Create AI pref request interface for now hardcode one
       * if yes, update update(user, labels)
       * if no, create, create(labels)
       */

      const labels = Array.from(uniqueLabelDescriptions);

      const floorTypes = [];
      const buildingStyles = [];
      const buildingTypes = [];
      const buildingAreas = [];
      const buildingFeatures = [];
      const materials = [];

      for (const label of labels) {
        if (label.includes("flooring")) {
          floorTypes.push(label);
        }
        if (label.includes("design")) {
          buildingStyles.push(label);
        }
        if (label === 'Commercial building' || label === 'Penthouse apartment' ) {
          buildingTypes.push(label);
        }
        if (label === 'Neighborhood' || label.includes('Residential') || label === 'Suburb')  {
          buildingAreas.push(label);
        }
        if (label === 'Garden' || label ===  'Courtyard' || label === 'Swimming pool' || label === 'Porch' || label === 'Dining room') {
          buildingFeatures.push(label);
        }
        if (label ===  'Hardwood' || label === 'Plywood' || label === 'Tile' || label === 'Natural material'||  label === 'Cobblestone' ) {
          materials.push(label);
        }
      }

      return {
        labelDescriptions: Array.from(uniqueLabelDescriptions),
        rgbValues,
      };
    }  
  }

