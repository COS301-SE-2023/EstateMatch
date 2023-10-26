import { QueryHandler, IQueryHandler, EventPublisher } from '@nestjs/cqrs';
import { CheckPropertyQuery, ICheckPropertyResponse } from '@estate-match/api/properties/util';
import { UserRepository } from '@estate-match/api/users/data-access';
//TODO: Add repo

@QueryHandler(CheckPropertyQuery)
export class CheckPropertyHandler implements IQueryHandler<CheckPropertyQuery, ICheckPropertyResponse> {
  constructor(
    private publisher: EventPublisher,
    private readonly repository: UserRepository
    ) {}

  async execute(query: CheckPropertyQuery) : Promise<ICheckPropertyResponse> {
    const username = query.request.user;
    //Query repo
    const user = await this.repository.findOne(username);
    if(user){
      if(user.properties.length > 3){
        return {empty: false};
      }else{
        return {empty: true};
      }
    }else{
      return {empty: true};
    }
 
  }
}