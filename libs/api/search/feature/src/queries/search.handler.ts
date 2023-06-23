import { QueryHandler, IQueryHandler, EventPublisher, InvalidQueryHandlerException } from '@nestjs/cqrs';
import { SearchQuery, ISearchResponse } from '@estate-match/api/search/util';
//TODO: Search Repo
// import { BrowseRepository } from '@mp/api/browse/data-access';

// query handler
@QueryHandler(SearchQuery)
export class SearchHandler implements IQueryHandler<SearchQuery, ISearchResponse> {
  constructor(
    private publisher: EventPublisher,
    // private readonly repository:(SearchRepository)
    ) {}

  async execute(query: SearchQuery) : Promise<any> {
    const request = query.request;
    console.log(request); 
    return null;
  }
}