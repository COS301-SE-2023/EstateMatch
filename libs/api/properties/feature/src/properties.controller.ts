import { Controller, Post, Body, Get } from '@nestjs/common';
import { PropertyLikesService } from './properties.service';

@Controller('PropertyLikes')
export class PropertyLikesController {
  constructor(private readonly propertyLikesService: PropertyLikesService) {}

  @Get()
  getData() {
    return this.propertyLikesService.getData();
  }

  /*@Post(':cardId/swipe')
  async swipeCard(
    @Body('userId') userId: string,
    @Body('action') action: 'like' | 'dislike',
  ): Promise<void> {
    await this.cardService.swipeCard(userId, cardId, action);
  }*/
}