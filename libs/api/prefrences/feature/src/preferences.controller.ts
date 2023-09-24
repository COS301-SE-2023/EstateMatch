import { Body, Controller, Get, Post } from '@nestjs/common';
import { PreferenceService } from './preferences.service';
import { IGetPreferencesRequest, ISetAIPreferencesRequest, ISetPreferencesRequest } from '@estate-match/api/prefrences/util';


@Controller()
export class PreferenceController {
    constructor(private readonly service: PreferenceService) {}
    @Post('/getPreferences')
    async getData(@Body() user: IGetPreferencesRequest){
        return await this.service.getPreferences(user);
    }

    @Post('/setPreferences')
    async postData(@Body() preferences: ISetPreferencesRequest){
        return await this.service.setPreferences(preferences);
    }

    @Post('/setAIPreferences')
    async setAIPreferences(@Body() preferences: ISetAIPreferencesRequest){
        return await this.service.setAIPreferences(preferences);
    }
    
    @Post('/getAIPreferences')
    async getAIPreferences(@Body() user: IGetPreferencesRequest){
        return await this.service.getAIPreferences(user);
    }
}