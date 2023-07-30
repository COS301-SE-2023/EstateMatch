import { QueryHandler, IQueryHandler, EventPublisher } from '@nestjs/cqrs';
import { CheckPropertyQuery, ICheckPropertyResponse } from '@estate-match/api/properties/util';
//TODO: Add repo

@QueryHandler(CheckPropertyQuery)
export class CheckPropertyHandler implements IQueryHandler<CheckPropertyQuery, ICheckPropertyResponse> {
  constructor(
    private publisher: EventPublisher,
    // private readonly repository:(BrowseRepository)
    ) {}

  async execute(query: CheckPropertyQuery) : Promise<any> {
    const request = query.request;
    //Query repo
    return {empty: true};
  }
}