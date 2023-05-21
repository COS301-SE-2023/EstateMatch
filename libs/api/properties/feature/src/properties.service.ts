import { Injectable } from '@nestjs/common';
import { DislikePropertyCommand, IDislikePropertyRequest, IDislikePropertyResponse } from '@estate-match/api/properties/util';
import { CommandBus } from '@nestjs/cqrs';
//import { InjectModel } from '@nestjs/mongoose';
//import { Model } from 'mongoose';
//import { Card } from './card.schema';
//import { User } from './user.schema';

@Injectable()
export class PropertiesService
{
    getData(): { message: string } 
    {

      return { message: 'Likes and dislikes api' };
    }
    constructor(private readonly commandBus: CommandBus){}
  /*constructor(
    @InjectModel('Card') private readonly cardModel: Model<Card>,
    @InjectModel('User') private readonly userModel: Model<User>,
  ) {}

  async swipeCard(userId: string, cardId: string, action: 'like' | 'dislike'): Promise<void> {
    const card = await this.cardModel.findById(cardId);
    const user = await this.userModel.findById(userId);

    if (!card || !user) {
      throw new Error('Card or User not found');
    }

    if (action === 'like') {
      // Add card ID to user's liked items
      user.likedItems.push(cardId);
    }

    // Save changes to the user
    await user.save();
  }*/

  async dislikeProperty(
    request: IDislikePropertyRequest
  ): Promise<IDislikePropertyResponse> {
      return await this.commandBus.execute<
          DislikePropertyCommand,
          IDislikePropertyResponse
      >(new DislikePropertyCommand(request));
  }
}
