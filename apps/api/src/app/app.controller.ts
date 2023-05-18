import { Controller, Get, Post } from '@nestjs/common';

import { AppService } from '@estate-match/api/core/feature';
import { setPreference, updatePreference } from '@estate-match/api/core/feature';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    const response = { preference:  setPreference('My initial preference'), updatePreference: updatePreference('My updated preference') };
    return response;
  }
}
