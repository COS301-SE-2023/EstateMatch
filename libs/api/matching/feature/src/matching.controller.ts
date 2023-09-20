import { Controller, Post, Body, Get } from '@nestjs/common';
import { MatchService } from './match.service';
import { IMatchRequest } from '@estate-match/api/matching/util';

@Controller()
export class MatchController {
  constructor(private readonly matchService: MatchService) {}

  @Post('/match')
  async match(@Body() request: IMatchRequest){
    return await this.matchService.match(request);
  }
}