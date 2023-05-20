import { Controller, Post, Body, Get } from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { IDislikePropertyRequest } from '@estate-match/api/properties/util';

@Controller()
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}

  @Get()
  getData() {
    return this.propertiesService.getData();
  }

  /*@Post(':cardId/swipe')
  async swipeCard(
    @Body('userId') userId: string,
    @Body('action') action: 'like' | 'dislike',
  ): Promise<void> {
    await this.cardService.swipeCard(userId, cardId, action);
  }*/

  @Post('/dislike')
  async dislikeProperty(@Body() property: IDislikePropertyRequest){
    return await this.propertiesService.dislikeProperty(property);
  }
}