import { UpdateChatCommand, IUpdateChatResponse } from "@estate-match/api/chat/util";
// import { ChatRepository } from "@estate-match/api/chat/data-access";
import { CommandHandler, ICommandHandler, EventPublisher } from "@nestjs/cqrs";

@CommandHandler(UpdateChatCommand)
export class UpdateChatHandler implements ICommandHandler<UpdateChatCommand, IUpdateChatResponse> {
    constructor(
        // private readonly userRepository: ChatRepository,
        private readonly publisher: EventPublisher
    ) {}

    async execute(command: UpdateChatCommand): Promise<any> {
        console.log('Here');
        
    }
}