import { Body, Controller, Get, Post } from '@nestjs/common';
import { PreferenceService } from './preferences.service';
import { IGetPreferencesRequest, ISetPreferencesRequest } from '@estate-match/api/prefrences/util';


@Controller()
export class PreferenceController {
    constructor(private readonly service: PreferenceService) {}
    @Get('/getPreferences')
    async getData(@Body() user: IGetPreferencesRequest){
        return await this.service.getPreferences(user);
    }

    @Post('/setPreferences')
    async postData(@Body() preferences: ISetPreferencesRequest){
        return await this.service.setPreferences(preferences);
    }
}