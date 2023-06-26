import { Controller, Get, Post } from '@nestjs/common';


@Controller()
export class CoreController {
  @Get()
  getData(){
    return 'Hello EstateMatch...';
  }
}