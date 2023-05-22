import { LikedPropertiesRepository } from "@estate-match/api/properties/data-access";
import { GetLikedPropertiesCommand, IGetLikedPropertiesResponse } from "@estate-match/api/properties/util";
import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";

@CommandHandler(GetLikedPropertiesCommand)
export class GetLikedPropertiesHandler implements ICommandHandler<GetLikedPropertiesCommand, IGetLikedPropertiesResponse> {
    constructor(
        private readonly repository: LikedPropertiesRepository,
        private readonly publisher: EventPublisher
    ) {}

    async execute(command: GetLikedPropertiesCommand): Promise<any> {
       const request = command.request;
       const user = request.user;

       return this.repository.getLikedProperties();
    }
}