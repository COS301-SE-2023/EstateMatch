import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PreferenceService } from './preferences.service';
import { IGetPreferencesRequest, IPreference } from '@estate-match/api/prefrences/util';


@Controller()
export class PreferenceController {
    constructor(private readonly service: PreferenceService) {}
    @Get('/getPreferences')
    async getData(@Body() user: IGetPreferencesRequest){
        return await this.service.getPreferences(user);
    }

    @Post('/setPreferences')
    async postData(@Body() preferences: IPreference){
        const myTest = {id: 1, body: preferences};
        return myTest;
    }
}