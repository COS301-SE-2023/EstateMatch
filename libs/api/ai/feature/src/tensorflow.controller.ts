import {Controller, Post, Body} from '@nestjs/common';
import {TensorflowService} from './tensorflow.service';

@Controller()
export class TensorflowController {
    constructor(private readonly tensorflowService: TensorflowService) {}

    @Post('/identify-feel')
    async identifyFeel(@Body() body: {imageUrl: string}): Promise<string> {
        const {imageUrl} = body;
        const result = await this.tensorflowService.identifyFeelFromURL(imageUrl);
        return result;
    }
}