import { Controller, Get, Post } from '@nestjs/common';


@Controller()
export class PreferenceController {
  @Get('/preferences/get')
  getData(){
    return 'Hello Preferences...';
  }

  @Post('/preferences/post')
  postData(){
    const myTest = {id: 1, name: 'post'};
    return myTest;
}
}