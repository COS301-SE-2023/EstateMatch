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
        username: 'test',
        filters: {
          location: ['test'],
          budgetMin: 10000000,
          budgetMax: 20000000,
          bedrooms: 1,
          bathrooms: 2,
          garages: 1 ,
          amenities: [],
        }
      };


        const expectedResult: ISearchResponse = {
            results: [{
                title: 'test',
                location: 'test',
                price: 15000,
                bedrooms: 1,
                bathrooms: 1,
                garages: 1,
                amenities: [],
                seen: false,
                aiLabel: [],
                rgbColour: [],
                description: [],
                images: ['test image']
            },
            {
              title: 'test',
              location: 'test',
              price: 15000,
              bedrooms: 1,
              bathrooms: 1,
              garages: 1,
              amenities: [],
              seen: false,
              aiLabel: [],
              rgbColour: [],
              description: [],
              images: ['test image']
            },]
        }

      jest.spyOn(service, 'search').mockResolvedValue(expectedResult);

      const result = await controller.search(search);

      
      expect(result).toEqual(expectedResult);
    });
  });

  });