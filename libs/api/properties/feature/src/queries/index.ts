import { QueryHandler, IQueryHandler, EventPublisher, InvalidQueryHandlerException } from '@nestjs/cqrs';
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
    console.log(request);
    //Query repo

  }
}