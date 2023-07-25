import { Injectable } from '@nestjs/common';
import { DislikePropertyCommand, IDislikePropertyRequest, IDislikePropertyResponse } from '@estate-match/api/properties/util';
import { LikePropertyCommand, ILikePropertyRequest, ILikePropertyResponse } from '@estate-match/api/properties/util';
import { IGetLikedPropertiesRequest, IGetLikedPropertiesResponse, GetLikedPropertiesCommand,  } from '@estate-match/api/properties/util';
import { GetPropertiesCommand, IGetPropertyRequest, IGetPropertyResponse } from '@estate-match/api/properties/util';
import { CommandBus } from '@nestjs/cqrs';

//create property imports 
import { ICreatePropertyRequest, ICreatePropertyResponse, CreatePropertyCommand } from '@estate-match/api/properties/util';

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

  async dislikeProperty(
    request: IDislikePropertyRequest
  ): Promise<IDislikePropertyResponse> {
      return await this.commandBus.execute<
          DislikePropertyCommand,
          IDislikePropertyResponse
      >(new DislikePropertyCommand(request));
  }

  async likeProperty(
    request: ILikePropertyRequest
  ): Promise<ILikePropertyResponse> {
      return await this.commandBus.execute<
          LikePropertyCommand,
          ILikePropertyResponse
      >(new LikePropertyCommand(request));
  }

  async getlikeProperty(
    request: IGetLikedPropertiesRequest
  ): Promise<IGetLikedPropertiesResponse> {
      return await this.commandBus.execute<
          GetLikedPropertiesCommand,
          IGetLikedPropertiesResponse
      >(new GetLikedPropertiesCommand(request));
  }

  //get property 
  async getProperty(
    request: IGetPropertyRequest
  ): Promise<IGetPropertyResponse> {
      return await this.commandBus.execute<
          GetPropertiesCommand,
          IGetPropertyResponse
      >(new GetPropertiesCommand(request));
  }

  //create property
  async createProperty(
    request: ICreatePropertyRequest
  ): Promise<ICreatePropertyResponse> {
      return await this.commandBus.execute<
          CreatePropertyCommand,
          ICreatePropertyResponse
      >(new CreatePropertyCommand(request));
  }
}
