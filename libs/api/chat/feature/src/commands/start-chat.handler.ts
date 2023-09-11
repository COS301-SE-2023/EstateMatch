// import { UserRepository } from "@estate-match/api/users/data-access";
import { StartChatCommand, IStartChatResponse } from "@estate-match/api/chat/util";
import { CommandHandler, ICommandHandler, EventPublisher } from "@nestjs/cqrs";

@CommandHandler(StartChatCommand)
export class StartChatHandler implements ICommandHandler<StartChatCommand, IStartChatResponse> {
    constructor(
        // private readonly userRepository: UserRepository,
        private readonly publisher: EventPublisher
    ) {}
    
    async execute(command: StartChatCommand): Promise<IStartChatResponse> {
        const response: IStartChatResponse = {
            message: "Good day, I am an AI assistant to help you to find your dream house. To get started, please provide me with a description of your dream house."
        }

        return response;
    }
}