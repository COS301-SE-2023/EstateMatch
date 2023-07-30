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

      const imageUrls = ["https://helium.privateproperty.co.za/live-za-images/property/635/30/9360635/images/property-9360635-7160804_dhd.jpg",
      "https://helium.privateproperty.co.za/live-za-images/property/635/30/9360635/images/property-9360635-29035859_dhd.jpg",
      "https://helium.privateproperty.co.za/live-za-images/property/635/30/9360635/images/property-9360635-17106470_dhd.jpg",
      "https://helium.privateproperty.co.za/live-za-images/property/635/30/9360635/images/property-9360635-61549932_dhd.jpg",
      "https://helium.privateproperty.co.za/live-za-images/property/635/30/9360635/images/property-9360635-32524510_dhd.jpg",
      "https://helium.privateproperty.co.za/live-za-images/property/635/30/9360635/images/property-9360635-96787670_dhd.jpg",
      "https://helium.privateproperty.co.za/live-za-images/property/635/30/9360635/images/property-9360635-84216206_dhd.jpg",
      "https://helium.privateproperty.co.za/live-za-images/property/635/30/9360635/images/property-9360635-49490620_dhd.jpg",
      "https://helium.privateproperty.co.za/live-za-images/property/635/30/9360635/images/property-9360635-14192455_dhd.jpg",
      "https://helium.privateproperty.co.za/live-za-images/property/635/30/9360635/images/property-9360635-41391600_dhd.jpg",
      "https://helium.privateproperty.co.za/live-za-images/property/635/30/9360635/images/property-9360635-64333825_dhd.jpg",
      "https://helium.privateproperty.co.za/live-za-images/property/635/30/9360635/images/property-9360635-85858315_dhd.jpg",
      "https://helium.privateproperty.co.za/live-za-images/property/635/30/9360635/images/property-9360635-1654516_dhd.jpg",
      "https://helium.privateproperty.co.za/live-za-images/property/635/30/9360635/images/property-9360635-40162161_dhd.jpg",
      "https://helium.privateproperty.co.za/live-za-images/property/635/30/9360635/images/property-9360635-24487838_dhd.jpg",
      "https://helium.privateproperty.co.za/live-za-images/property/635/30/9360635/images/property-9360635-63113105_dhd.jpg",
      "https://helium.privateproperty.co.za/live-za-images/property/635/30/9360635/images/property-9360635-86253315_dhd.jpg",
      "https://helium.privateproperty.co.za/live-za-images/property/635/30/9360635/images/property-9360635-71604203_dhd.jpg",
      "https://helium.privateproperty.co.za/live-za-images/property/635/30/9360635/images/property-9360635-118070_dhd.jpg",
      "https://helium.privateproperty.co.za/live-za-images/property/635/30/9360635/images/property-9360635-27618645_dhd.jpg",
      "https://helium.privateproperty.co.za/live-za-images/property/635/30/9360635/images/property-9360635-43543644_dhd.jpg",
      "https://helium.privateproperty.co.za/live-za-images/property/635/30/9360635/images/property-9360635-92999193_dhd.jpg",
      "https://helium.privateproperty.co.za/live-za-images/property/635/30/9360635/images/property-9360635-43953264_dhd.jpg",
      "https://helium.privateproperty.co.za/live-za-images/property/635/30/9360635/images/property-9360635-22001078_dhd.jpg",
      "https://helium.privateproperty.co.za/live-za-images/property/635/30/9360635/images/property-9360635-37383758_dhd.jpg",
      "https://helium.privateproperty.co.za/live-za-images/property/635/30/9360635/images/property-9360635-61210692_dhd.jpg",
      "https://helium.privateproperty.co.za/live-za-images/property/635/30/9360635/images/property-9360635-99207207_dhd.jpg",
      "https://helium.privateproperty.co.za/live-za-images/property/635/30/9360635/images/property-9360635-97620092_dhd.jpg",
      "https://helium.privateproperty.co.za/live-za-images/property/635/30/9360635/images/property-9360635-98777044_dhd.jpg",
      "https://helium.privateproperty.co.za/live-za-images/property/635/30/9360635/images/property-9360635-66352018_dhd.jpg"]

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

    console.log('Predictions:', predictions.dataSync()); // Debug statement

    return predictedClass;
  }



}