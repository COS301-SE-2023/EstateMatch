import { Controller, Post, Body, Get } from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { ICheckPropertyRequest, IDislikePropertyRequest } from '@estate-match/api/properties/util';
import { ILikePropertyRequest } from '@estate-match/api/properties/util';
import { IGetPropertyRequest } from '@estate-match/api/properties/util';
import { IGetLikedPropertiesRequest } from '@estate-match/api/properties/util';
import { ICreatePropertyRequest } from '@estate-match/api/properties/util';

@Controller()
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}

  @Get()
  getData() {
    return this.propertiesService.getData();
  }

  @Post('/dislike')
  async dislikeProperty(@Body() property: IDislikePropertyRequest){
    return await this.propertiesService.dislikeProperty(property);
  }

  @Post('/like')
  async likeProperty(@Body() property: ILikePropertyRequest)
  {
    return await this.propertiesService.likeProperty(property);
  }

  @Post('/getLikedProperties')
  async getLikedProperties(@Body() user: IGetLikedPropertiesRequest) {
    return await this.propertiesService.getlikeProperty(user);
  }

  @Post('/getProperty')
  async getProperty(@Body() property: IGetPropertyRequest) {
    return await this.propertiesService.getProperty(property);
  }

  @Post('/createProperty')
  async createProperty(@Body() property: ICreatePropertyRequest) {
    return await this.propertiesService.createProperty(property);
  }

  @Post('/propertyCheck')
  async propertyCheck(@Body() user: ICheckPropertyRequest){
    return await this.propertiesService.propertyCheck(user);
  }

  @Post('/getUserProperties')
  async getUserProperties(@Body() user: string){
    
  }
}