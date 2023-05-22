import { Controller, Get, Post } from '@nestjs/common';


@Controller()
export class CoreController {
  @Get()
  getData(){
    return 'Hello EstateMatch...';
  }

  @Post('/post')
  postData(){
    const myTest = {id: 1, name: 'test'};
    return myTest;
}
}