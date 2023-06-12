import { Body, Controller, Get, Post } from '@nestjs/common';
import { IGetPreferencesRequest, ISetPreferencesRequest } from '@estate-match/api/prefrences/util';


@Controller()
export class AuthController {
    // constructor(private readonly service: PreferenceService) {}
    @Post('/login')
    login(): any {
        return {message: 'login'};
    }
}