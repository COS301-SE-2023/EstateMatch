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
            location: 'My Test Location',
            minBudget: 10000,
            maxBudget: 20000,
            type: 'My Test Type',
        }
    };

    const commandResponse: ISearchResponse = { 
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
    };

    (queryBus.execute as jest.Mock).mockResolvedValue(commandResponse);
    const result = await service.search(request);
    expect(queryBus.execute).toHaveBeenCalledWith(
      expect.any(SearchQuery),
    );
    expect(result).toEqual(commandResponse);
  });
});






