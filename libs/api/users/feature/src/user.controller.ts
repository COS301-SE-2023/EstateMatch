import {Controller, Post, Body, Get} from '@nestjs/common';
import {UserService} from './user.service';
import { IGetUserRequest, ISetUserLanguagePrefRequest } from '@estate-match/api/users/util';
import { ISetUserRequest} from '@estate-match/api/users/util';
import { IUpdateUserRequest} from '@estate-match/api/users/util';
@Controller()
export class UserController {
    constructor(private readonly userService: UserService) {}
    // @Get
    // getData(){
    //     return this.userService.getData();
    // }
    
    @Post('/getUser')
    async getUser(@Body() request: IGetUserRequest) {
        return await this.userService.getUser(request);
    }
    
    @Post('/setUser')
    async setUser(@Body() request: ISetUserRequest) {
        return await this.userService.setUser(request);
    }

    @Post('/updateUser')
    async updateUser(@Body() request: IUpdateUserRequest) {
        return await this.userService.updateUser(request);
    }

    @Post('/setUserLanguagePref')
    async getUserLanguagePref(@Body() request: ISetUserLanguagePrefRequest) {
        return await this.userService.SetUserLanguagePref(request);
    }
}