import { Controller, Get, Post } from '@nestjs/common';


@Controller()
export class AppController {
  @Get()
  getData(){
    return 'Hello EstateMatch...';
  }
  // constructor(private readonly appService: AppService) {}

  // @Get()
  // getData() {
  //   const response = { preference:  setPreference('My initial preference'), updatePreference: updatePreference('My updated preference') };
  //   return response;
  // }
}
