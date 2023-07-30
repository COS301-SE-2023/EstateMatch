import * as tensorflow from '@tensorflow/tfjs-node';
import { Injectable } from '@nestjs/common';
import fetch from 'node-fetch';
import * as jimp from 'jimp';

const NUM_CLASSES = 3;
const IMAGE_SIZE = 224;
const MODEL_PATH = 'file://libs/api/ai/feature/src/Model/model.json';


@Injectable()
export class TensorflowService {
    private model: tensorflow.LayersModel| null = null;
    private modelLoaded: Promise<void>;

    constructor() {
        this.modelLoaded = this.loadModel();
    }

    private async loadModel() {
      try {
        // Load the SavedModel
        this.model = await tensorflow.loadLayersModel(MODEL_PATH);
    
      } catch (error) {
        console.error('Failed to load the model:', error);
        throw error;
      }
    }

    async identifyFeelFromURL(imageUrl: string): Promise<string> {

      await this.modelLoaded; // Wait for the model to load

      if (!this.model) {
          throw new Error('TensorFlow model not loaded.');
      }
      const predictions: string[] = [];

      const imageUrls = ["https://helium.privateproperty.co.za/live-za-images/property/142/26/9452142/images/property-9452142-82731058_dhd.jpg",
      "https://helium.privateproperty.co.za/live-za-images/property/142/26/9452142/images/property-9452142-67831791_dhd.jpg",
      "https://helium.privateproperty.co.za/live-za-images/property/142/26/9452142/images/property-9452142-30935408_dhd.jpg",
      "https://helium.privateproperty.co.za/live-za-images/property/142/26/9452142/images/property-9452142-91767375_dhd.jpg",
      "https://helium.privateproperty.co.za/live-za-images/property/142/26/9452142/images/property-9452142-67309059_dhd.jpg",
      "https://helium.privateproperty.co.za/live-za-images/property/142/26/9452142/images/property-9452142-22809096_dhd.jpg",
      "https://helium.privateproperty.co.za/live-za-images/property/142/26/9452142/images/property-9452142-55335293_dhd.jpg",
      "https://helium.privateproperty.co.za/live-za-images/property/142/26/9452142/images/property-9452142-98264953_dhd.jpg",
      "https://helium.privateproperty.co.za/live-za-images/property/142/26/9452142/images/property-9452142-35737549_dhd.jpg",
      "https://helium.privateproperty.co.za/live-za-images/property/142/26/9452142/images/property-9452142-80252287_dhd.jpg",
      "https://helium.privateproperty.co.za/live-za-images/property/142/26/9452142/images/property-9452142-47900261_dhd.jpg",
      "https://helium.privateproperty.co.za/live-za-images/property/142/26/9452142/images/property-9452142-33979576_dhd.jpg",
      "https://helium.privateproperty.co.za/live-za-images/property/142/26/9452142/images/property-9452142-90002779_dhd.jpg",
      "https://helium.privateproperty.co.za/live-za-images/property/142/26/9452142/images/property-9452142-30806750_dhd.jpg",
      "https://helium.privateproperty.co.za/live-za-images/property/142/26/9452142/images/property-9452142-84466614_dhd.jpg",
      "https://helium.privateproperty.co.za/live-za-images/property/142/26/9452142/images/property-9452142-65929141_dhd.jpg",
      "https://helium.privateproperty.co.za/live-za-images/property/142/26/9452142/images/property-9452142-79507378_dhd.jpg",
      "https://helium.privateproperty.co.za/live-za-images/property/142/26/9452142/images/property-9452142-43854646_dhd.jpg",
      "https://helium.privateproperty.co.za/live-za-images/property/142/26/9452142/images/property-9452142-45197737_dhd.jpg",
      "https://helium.privateproperty.co.za/live-za-images/property/142/26/9452142/images/property-9452142-13586411_dhd.jpg",
      "https://helium.privateproperty.co.za/live-za-images/property/142/26/9452142/images/property-9452142-74975037_dhd.jpg",
      "https://helium.privateproperty.co.za/live-za-images/property/142/26/9452142/images/property-9452142-20164600_dhd.jpg"]

      for (const imageUrl of imageUrls) {
        const imageBuffer = await this.downloadImage(imageUrl);
        const tensor = await this.preprocessImage(imageBuffer);
        const predictedClass = await this.classifyImage(tensor);
  
        // Replace these classes with whatever feel categories you want to use
        const feelClasses = ['Light', 'Dark', 'Colorful'];
        const predictionLabel = feelClasses[predictedClass];
        predictions.push(predictionLabel);
      }
  
      const majorityClassification = this.getMajorityClassification(predictions);
      return majorityClassification;
    }

    private getMajorityClassification(predictions: string[]): string {
      // Count the occurrences of each prediction label
      const predictionCounts: { [key: string]: number } = {};
      predictions.forEach((prediction) => {
        predictionCounts[prediction] = (predictionCounts[prediction] || 0) + 1;
      });

      // Find the prediction label with the highest count
      let majorityLabel = '';
      let majorityCount = 0;
      Object.entries(predictionCounts).forEach(([label, count]) => {
        if (count > majorityCount) {
          majorityLabel = label;
          majorityCount = count;
        }
      });

      return majorityLabel;
    }

    private async downloadImage(imageUrl: string): Promise<Buffer> {
        const response = await fetch(imageUrl);
        if (!response.ok) {
            throw new Error('Failed to download the image.');
        }
        return response.buffer();
    }

    private async loadImageFromURL(imageUrl: string): Promise<jimp> {
        const image = await jimp.read(imageUrl);
        return image;
    }

    private async preprocessImage(imageBuffer: Buffer): Promise<tensorflow.Tensor3D> {
      const image = await jimp.read(imageBuffer);
      image.resize(224, 224);

      // Remove the alpha channel from the image data
      const imageData = new Uint8Array(image.bitmap.data.slice(0, 224 * 224 * 3));

      // Convert Jimp image to tf.Tensor3D
      const tensor = tensorflow.tensor3d(imageData, [224, 224, 3]).toFloat();

      // Normalize the pixel values between 0 and 1
      tensor.div(tensorflow.scalar(255));

      // Add a batch dimension
      tensor.expandDims(0);

      return tensor;
  }

  private async classifyImage(image: tensorflow.Tensor3D): Promise<number> {
    // Preprocess the input image (resize and normalize)
    const processedImage = tensorflow.image.resizeBilinear(image, [IMAGE_SIZE, IMAGE_SIZE]).div(tensorflow.scalar(255));

    // Add a batch dimension to match the model's input shape
    const batchedImage = processedImage.expandDims(0);

    // Make predictions
    const predictions = this.model?.predict(batchedImage) as tensorflow.Tensor;
    const predictedClass = predictions.argMax(1).dataSync()[0];

    //console.log('Predictions:', predictions.dataSync()); // Debug statement

    return predictedClass;
  }



}