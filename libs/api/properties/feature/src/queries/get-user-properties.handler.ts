import { QueryHandler, IQueryHandler, EventPublisher } from '@nestjs/cqrs';
import { GetUserPropertiesQuery, IGetUserPropertiesResponse } from '@estate-match/api/properties/util';
import { PropertiesRepository } from '@estate-match/api/properties/data-access';
//TODO: Add repo

@QueryHandler(GetUserPropertiesQuery)
export class GetUserPropertiesHandler implements IQueryHandler<GetUserPropertiesQuery, IGetUserPropertiesResponse> {
  constructor(
    private publisher: EventPublisher,
    private readonly repository: PropertiesRepository
    ) {}

  async execute(query: GetUserPropertiesQuery) : Promise<IGetUserPropertiesResponse> {
    const user = query.request.user;
    //Query repo

    const response: IGetUserPropertiesResponse = {
        properties : []
    }

    response.properties = await this.repository.getUserProperties(user);
    return response;
  }
}