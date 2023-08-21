import { UpdateChatCommand, IUpdateChatResponse } from "@estate-match/api/chat/util";
import { UserRepository } from "@estate-match/api/users/data-access";
import { CommandHandler, ICommandHandler, EventPublisher } from "@nestjs/cqrs";

@CommandHandler(UpdateChatCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateChatCommand, IUpdateChatResponse> {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly publisher: EventPublisher
    ) {}

    async execute(command: UpdateChatCommand): Promise<IUpdateChatResponse> {
        
        
    }
}