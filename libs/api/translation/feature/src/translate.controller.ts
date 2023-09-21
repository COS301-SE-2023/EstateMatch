import {Controller, Post, Body, Get} from '@nestjs/common';
import {TranslateService} from './translate.service';
import { ITranslateRequest } from '@estate-match/api/translation/util';

@Controller()
export class TranslateController {
    constructor(private readonly translateService: TranslateService) {}
    
    @Post('/translate')
    async translate(@Body() request: ITranslateRequest) {
        return await this.translateService.translate(request);
    }
}