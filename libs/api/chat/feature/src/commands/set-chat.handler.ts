// import { ChatRepository } from "@estate-match/api/chat/data-access";
import { SetChatCommand, ISetChatResponse } from "@estate-match/api/chat/util";
import { CommandHandler, ICommandHandler, EventPublisher } from "@nestjs/cqrs";
import { PromptTemplate, PipelinePromptTemplate } from "langchain/prompts";


@CommandHandler(SetChatCommand)
export class SetChatHandler implements ICommandHandler<SetChatCommand, ISetChatResponse> {
    constructor(
        // private readonly userRepository: ChatRepository,
        private readonly publisher: EventPublisher
    ) {}
    
    async execute(command: SetChatCommand): Promise<any> {

        const fullPrompt = PromptTemplate.fromTemplate(
            `{introduction} {example}`
        );

        const introPrompt = PromptTemplate.fromTemplate(
            `Hello, {username} please describe your ideal home.`
        );

        const examplePrompt = PromptTemplate.fromTemplate(
            `For example, you could say: {message}`
        );
        
        const composedPrompt = new PipelinePromptTemplate({
            pipelinePrompts: [
                {name: 'introduction', prompt: introPrompt},
                {name: 'example', prompt: examplePrompt}
            ],
            finalPrompt: fullPrompt
        });

        const finalPrompt = await composedPrompt.format({
            username: command.request.chat.username,
            message: command.request.chat.message
        });

        console.log(finalPrompt);
    }
}