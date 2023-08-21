import { UserRepository } from "@estate-match/api/users/data-access";
import { GetChatCommand, IGetChatResponse } from "@estate-match/api/chat/util";
import { CommandHandler, ICommandHandler, EventPublisher } from "@nestjs/cqrs";

@CommandHandler(GetChatCommand)
export class GetChatHandler implements ICommandHandler<GetChatCommand, IGetChatResponse> {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly publisher: EventPublisher
    ) {}
    
    async execute(command: GetChatCommand): Promise<any> {
        
    }
}