import { UserRepository } from "@estate-match/api/users/data-access";
import { SetChatCommand, ISetChatResponse } from "@estate-match/api/chat/util";
import { CommandHandler, ICommandHandler, EventPublisher } from "@nestjs/cqrs";

@CommandHandler(SetChatCommand)
export class SetUserHandler implements ICommandHandler<SetChatCommand, ISetChatResponse> {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly publisher: EventPublisher
    ) {}
    
    async execute(command: SetChatCommand): Promise<any> {
        
    }
}