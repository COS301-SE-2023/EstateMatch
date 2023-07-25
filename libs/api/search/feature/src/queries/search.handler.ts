import { QueryHandler, IQueryHandler, EventPublisher, InvalidQueryHandlerException } from '@nestjs/cqrs';
import { SearchQuery, ISearchResponse, ISearchRequest } from '@estate-match/api/search/util';
//TODO: Search Repo
import { PropertiesRepository } from '@estate-match/api/properties/data-access';
import { IPropSearch } from '@estate-match/api/properties/util';

// query handler
@QueryHandler(SearchQuery)
export class SearchHandler implements IQueryHandler<SearchQuery, ISearchResponse> {
  constructor(
    private publisher: EventPublisher,
    private readonly repository: PropertiesRepository
    ) {}

  async execute(query: SearchQuery) : Promise<any> {
    const request = query.request; 
    const searchPropReq: IPropSearch = {
      location: request.filters.location,
      minBudget: request.filters.minBudget,
      maxBudget: request.filters.maxBudget,
      type: request.filters.type,
    };   
    return this.repository.getPropertiesByPreferences(searchPropReq);
  }
}