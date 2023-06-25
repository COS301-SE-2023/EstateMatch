import { QueryHandler, IQueryHandler, EventPublisher, InvalidQueryHandlerException } from '@nestjs/cqrs';
import { SearchQuery, ISearchResponse, ISearchRequest } from '@estate-match/api/search/util';
//TODO: Search Repo
import { PropertiesRepository } from '@estate-match/api/properties/data-access';

// query handler
@QueryHandler(SearchQuery)
export class SearchHandler implements IQueryHandler<SearchQuery, ISearchResponse> {
  constructor(
    private publisher: EventPublisher,
    private readonly repository: PropertiesRepository
    ) {}

  async execute(query: SearchQuery) : Promise<any> {
    const request = query.request;    
    return this.repository.getPropertiesByPreferences(request);
  }
}