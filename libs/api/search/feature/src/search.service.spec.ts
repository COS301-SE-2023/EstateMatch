import { Test, TestingModule } from '@nestjs/testing';
import { SearchService } from './search.service';
import { QueryBus } from '@nestjs/cqrs';
import {
    ISearchRequest, ISearchResponse, SearchQuery,
} from '@estate-match/api/search/util';

describe('SearchService', () => {
  let service: SearchService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SearchService,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<SearchService>(SearchService);
    queryBus = module.get<QueryBus>(QueryBus);
  });

  it('should return an array of properties', async () => {
    const request: ISearchRequest = { 
        filters: {
          location: 'test',
          budgetMin: 10000000,
          budgetMax: 20000000,
          bedrooms: 1,
          bathrooms: 2,
          garages: 1 ,
          amenities: [],
        }
    };

    const commandResponse: ISearchResponse = { 
      results: [{
        title: 'test',
        location: 'test',
        price: 15000,
        bedrooms: 1,
        bathrooms: 1,
        garages: 1,
        amenities: [],
        images: ['test image']
    },
    {
      title: 'test2',
      location: 'test2',
      price: 15000,
      bedrooms: 1,
      bathrooms: 1,
      garages: 1,
      amenities: [],
      images: ['test image']
    },]
    };

    (queryBus.execute as jest.Mock).mockResolvedValue(commandResponse);
    const result = await service.search(request);
    expect(queryBus.execute).toHaveBeenCalledWith(
      expect.any(SearchQuery),
    );
    expect(result).toEqual(commandResponse);
  });
});






