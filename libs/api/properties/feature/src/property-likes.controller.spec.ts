import {Test, TestingModule} from '@nestjs/testing';

import {PropertiesController} from './properties.controller';
import {PropertiesService} from './properties.service';

describe('PropertiesController', () => {
    let app: TestingModule;
  
    beforeAll(async () => {
      app = await Test.createTestingModule({
        controllers: [PropertiesController],
        providers: [PropertiesService],
      }).compile();
    });
  
    describe('getData', () => {
      it('should return "Likes and dislikes api"', () => {
        const appController = app.get<PropertiesController>(PropertiesController);
        expect(appController.getData()).toEqual({ message: 'Likes and dislikes api' });
      });
    });
  }
);