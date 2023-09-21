import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IMatchRequest, IMatchResponse, MatchCommand } from '@estate-match/api/matching/util';

//import { InjectModel } from '@nestjs/mongoose';
//import { Model } from 'mongoose';
//import { Card } from './card.schema';
//import { User } from './user.schema';

@Injectable()
export class MatchingService
{
    constructor(private readonly commandBus: CommandBus){}

  async match(
    request: IMatchRequest
  ): Promise<IMatchResponse> {
      return await this.commandBus.execute<
          MatchCommand,
          IMatchResponse
      >(new MatchCommand(request));
  }
}
