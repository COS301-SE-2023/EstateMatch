import {Test, TestingModule} from '@nestjs/testing';

import {PropertyLikesController} from './property-likes.controller';
import {PropertyLikesService} from './property-likes.service';

describe('PropertyLikesController', () => {
    let app: TestingModule;
  
    beforeAll(async () => {
      app = await Test.createTestingModule({
        controllers: [PropertyLikesController],
        providers: [PropertyLikesService],
      }).compile();
    });
  
    describe('getData', () => {
      it('should return "Likes and dislikes api"', () => {
        const appController = app.get<PropertyLikesController>(PropertyLikesController);
        expect(appController.getData()).toEqual({ message: 'Likes and dislikes api' });
      });
    });
  });
  