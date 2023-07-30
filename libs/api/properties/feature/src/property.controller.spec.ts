import { Test, TestingModule } from '@nestjs/testing';
import { PropertiesController } from './properties.controller';
import { PropertiesService } from './properties.service';
import { IDislikePropertyRequest, IDislikePropertyResponse, ILikePropertyRequest, ILikePropertyResponse } from '@estate-match/api/properties/util';
import { IGetLikedPropertiesRequest, IGetLikedPropertiesResponse } from '@estate-match/api/properties/util';
import { IProperty, ILikeProperty } from '@estate-match/api/properties/util';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

describe('PropertiesController', () => {
  let app: TestingModule;
  let controller: PropertiesController;
  let service: PropertiesService;
  let commandBusMock: { execute: jest.Mock };
  let queryBusMock: { execute: jest.Mock };

  beforeAll(async () => {
    commandBusMock = { execute: jest.fn() };
    queryBusMock = { execute: jest.fn() };
    app = await Test.createTestingModule({
      controllers: [PropertiesController],
      providers: [PropertiesService,
        {
            provide: CommandBus,
            useValue: commandBusMock,
        },
        {
          provide: QueryBus,
          useValue: queryBusMock,
        }],
    }).compile();

    controller = app.get<PropertiesController>(PropertiesController);
    service = app.get<PropertiesService>(PropertiesService);
  });

  describe('getData', () => {
    it('should return "Likes and dislikes api"', () => {
      const propertiesController = app.get<PropertiesController>(PropertiesController);
      expect(propertiesController.getData()).toEqual({ message: 'Likes and dislikes api' });
    });
  });

  describe('dislikeProperty', () => {
    it('should call propertiesService.dislikeProperty with the provided property and return the result', async () => {
      const property: ILikeProperty = {
        // Fill in the necessary properties of the dislike property object
        // For example:
        user: 'test',
        address: 'test address',
        price: 100000,
        bedrooms: 2,
        bathrooms: 1,
        garages: 1,
        amenities: ['gym', 'pool'],
        liked: false,
        image: 'test image'
      };

      const request: IDislikePropertyRequest = {
        property: property,
      };

      const expectedResult: IDislikePropertyResponse = {
        message: 'property disliked',
      };

      jest.spyOn(service, 'dislikeProperty').mockResolvedValue(expectedResult);

      const result = await controller.dislikeProperty(request);

      
      expect(result).toEqual(expectedResult);
    });
  });

  describe('likeProperty', () => {
    it('should call propertiesService.likeProperty with the provided property and return the result', async () => {
      const property: ILikeProperty = {
        user: 'test',
        address: 'test address',
        price: 100000,
        bedrooms: 2,
        bathrooms: 1,
        garages: 1,
        amenities: ['gym', 'pool'],
        liked: true,
        image: 'test image'
      };

      const request: ILikePropertyRequest = {
        property: property,
      };

      const expectedResult: ILikePropertyResponse = {
        message: 'property liked',
      };

    

      jest.spyOn(service, 'likeProperty').mockResolvedValue(expectedResult);

      const result = await controller.likeProperty(request);

      expect(result).toEqual(expectedResult);
    });
  });

  describe('getLikedProperties', () => {
    it('should call return the liked properties of the user', async () => {
      const user: IGetLikedPropertiesRequest = {
        user: 'test',
      };

      const expectedResult: IGetLikedPropertiesResponse = {
        properties: [{
          user: 'test',
          address: 'test',
          price: 1000,
          bedrooms: 1,
          bathrooms: 1,
          garages: 1,
          amenities: [],
          liked: true,
          image: 'test image'
        },]
      };

      jest.spyOn(service, 'getlikeProperty').mockResolvedValue(expectedResult);

      const result = await controller.getLikedProperties(user);
      expect(result).toEqual(expectedResult);

    });
  });



});