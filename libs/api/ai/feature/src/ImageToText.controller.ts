import {Controller, Post, Body} from '@nestjs/common';
import {ImageToTextService} from './ImageToText.service';

@Controller()
export class ImageToTextController {
    constructor(private readonly imagetotextService: ImageToTextService) {}

    @Post('/image-to-text')
    async imageToText(@Body() body: {imageUrls: string[]}) {
        const {imageUrls} = body;
        const result = await this.imagetotextService.analyzeImages(imageUrls);
        return result;
    }
}