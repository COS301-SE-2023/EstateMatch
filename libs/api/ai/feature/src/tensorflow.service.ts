import * as tensorflow from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';
import { Injectable } from '@nestjs/common';
import fetch from 'node-fetch';
import * as jimp from 'jimp';

@Injectable()
export class TensorflowService {
    private model: mobilenet.MobileNet| null = null;
    private modelLoaded: Promise<void>;

    constructor() {
        this.modelLoaded = this.loadModel();
    }

    private async loadModel() {
      try {
        this.model = await mobilenet.load();
        console.log('TensorFlow model loaded successfully.');
      } catch (error) {
        console.error('Failed to load the TensorFlow model:', error);
      }
    }

    async identifyFeelFromURL(imageUrl: string): Promise<string> {

      await this.modelLoaded; // Wait for the model to load

      if (!this.model) {
          throw new Error('TensorFlow model not loaded.');
      }
      const imageBuffer = await this.downloadImage("https://cdn.remax.co.za/listings/4253694/original/b2fc4c65-dd28-29d9-118f-c400d9f22d73.jpg");

      // Preprocess the image
      const tensor = await this.preprocessImage(imageBuffer);

      console.log('Tensor shape:', tensor.shape); // Debug statement

      // Perform image classification
      const predictions = this.model.infer(tensor) as tensorflow.Tensor;
      const predictionData = await predictions.data() as Float32Array;
      const predictionShape = predictions.shape;

      console.log('Prediction Shape:', predictionShape); // Debug statement
      console.log('Prediction Data:', predictionData); // Debug statement

      // Replace these classes with whatever feel categories you want to use
      const feelClasses = ["happy", "sad", "peaceful", "energetic", "calm"];
      console.log('Feel Classes:', feelClasses); // Debug statement
      let maxProb = 0;
      let maxIndex = 0;

      for (let i = 0; i < predictionData.length; i++) {
        if (predictionData[i] > maxProb) {
            maxProb = predictionData[i];
            maxIndex = i;
        }
      }
      console.log('Max Index:', maxIndex); // Debug statement

      return `The feel of the image is: ${feelClasses[maxIndex]} (Confidence: ${Math.round(maxProb * 100)}%)`;
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
}