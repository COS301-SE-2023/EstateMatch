import {Controller, Post, Body} from '@nestjs/common';
import {ImageToTextService} from './ImageToText.service';

@Controller()
export class ImageToTextController {
    constructor(private readonly imagetotextService: ImageToTextService) {}

    @Post('/image-to-text')
    async imageToText(@Body() body: {imageUrls: string[], username: string}) { //Need to update body to have username
        const {imageUrls} = body;
        const {username} = body;
        const result = await this.imagetotextService.analyzeImages(imageUrls,username);
        return result;
    }
}