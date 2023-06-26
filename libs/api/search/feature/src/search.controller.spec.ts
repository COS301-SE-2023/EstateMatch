import { Test, TestingModule } from '@nestjs/testing';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { ISearchRequest, ISearchResponse } from '@estate-match/api/search/util';
import { QueryBus } from '@nestjs/cqrs';

describe('SearchController', () => {
  let app: TestingModule;
  let controller: SearchController;
  let service: SearchService;
  let queryBusMock: { execute: jest.Mock };

  beforeAll(async () => {
    queryBusMock = { execute: jest.fn() };
    app = await Test.createTestingModule({
      controllers: [SearchController],
      providers: [SearchService,
        {
            provide: QueryBus,
            useValue: queryBusMock,
        }],
    }).compile();

    controller = app.get<SearchController>(SearchController);
    service = app.get<SearchService>(SearchService);
  });

//   describe('getData', () => {
//     it('should return "Likes and dislikes api"', () => {
//       const controller = app.get<SearchController>(SearchController);
//       expect(controller.search()).toEqual({ message: 'Likes and dislikes api' });
//     });
//   });

  describe('search', () => {
    it('should search for properties in the database that meet certain critertia', async () => {
      const search: ISearchRequest = {
        filters: {
            location: 'My Test Location',
            minBudget: 10000,
            maxBudget: 20000,
            type: 'My Test Type',
        }
      };

        const expectedResult: ISearchResponse = {
            results: [{
                user: 'test',
                address: 'test',
                price: 15000,
                bedrooms: 1,
                bathrooms: 1,
                garages: 1,
                amenities: [],
                liked: true,
                image: ['test image']
            },
            {
                user: 'test2',
                address: 'test2',
                price: 15000,
                bedrooms: 1,
                bathrooms: 1,
                garages: 1,
                amenities: [],
                liked: true,
                image: ['test image']
            },]
        }

      jest.spyOn(service, 'search').mockResolvedValue(expectedResult);

      const result = await controller.search(search);

      
      expect(result).toEqual(expectedResult);
    });
  });

  });