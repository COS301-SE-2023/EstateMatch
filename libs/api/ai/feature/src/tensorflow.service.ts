import * as tensorflow from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';
import { PixelData } from '@tensorflow/tfjs';
import { Injectable } from '@nestjs/common';


@Injectable()
export class TensorflowService {
    private model!: mobilenet.MobileNet;

    constructor() {
        this.loadModel();
    }

    private async loadModel() {
        this.model = await mobilenet.load();
    }

    async identifyFeelFromURL(imageUrl: string): Promise<string> {
        const image = await this.loadImageFromURL(imageUrl);

        // Preprocess the image
        const tensor = this.preprocessImage(image);

        // Perform image classification
        const predictions = await this.model.infer(tensor) as tensorflow.Tensor;

        // Replace these classes with whatever feel categories you want to use
        const feelClasses = ["happy", "sad", "peaceful", "energetic", "calm"];
        const predictionData = await predictions.data();
        let maxProb = 0;
        let maxIndex = 0;

        predictionData.forEach((prob, index) => {
        if (prob > maxProb) {
            maxProb = prob;
            maxIndex = index;
        }
        });

        return `The feel of the image is: ${feelClasses[maxIndex]} (Confidence: ${Math.round(maxProb * 100)}%)`;
        
    }

    private async loadImageFromURL(imageUrl: string): Promise<HTMLImageElement> {
        return new Promise((resolve, reject) => {
          const image = new Image();
          image.crossOrigin = 'anonymous'; // Allow loading images from different origins
          image.onload = () => resolve(image);
          image.onerror = (error) => reject(error);
          image.src = imageUrl;
        });
      }

      private preprocessImage(image: HTMLImageElement): tensorflow.Tensor4D {
        const canvas = document.createElement('canvas');
        canvas.width = 224;
        canvas.height = 224;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(image, 0, 0, 224, 224);
        const imageData = ctx?.getImageData(0, 0, 224, 224);

        const data = imageData?.data as unknown as PixelData;
        const tensor = tensorflow.browser.fromPixels(data).toFloat();
    
        // Normalize the pixel values between -1 and 1
        const offset = tensorflow.scalar(127.5);
        return tensor.sub(offset).div(offset).expandDims();
      }
}