import { Controller, Post, Body, Get } from '@nestjs/common';
import { MatchingService } from './matching.service';
import { IMatchRequest } from '@estate-match/api/matching/util';

@Controller()
export class MatchingController {
  constructor(private readonly matchService: MatchingService) {}

  @Post('/match')
  async match(@Body() request: IMatchRequest){
    return await this.matchService.match(request);
  }
}