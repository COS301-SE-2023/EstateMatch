import { Controller, Post, Body, Get } from '@nestjs/common';
import { SearchService } from './search.service';
import { ISearchRequest } from '@estate-match/api/search/util';

@Controller()
export class PropertiesController {
  constructor(private readonly searchService: SearchService) {}

  @Post('/search')
  async dislikeProperty(@Body() filters: ISearchRequest){
    return await this.searchService.search(filters);
  }
}