// import { ChatRepository } from "@estate-match/api/chat/data-access";
import { SetChatCommand, ISetChatResponse } from "@estate-match/api/chat/util";
import { CommandHandler, ICommandHandler, EventPublisher } from "@nestjs/cqrs";
import {
    ChatPromptTemplate,
    PromptTemplate,
    SystemMessagePromptTemplate,
    AIMessagePromptTemplate,
    HumanMessagePromptTemplate,
    MessagesPlaceholder
} from "langchain/prompts";

import {
    AIMessage,
    HumanMessage,
    SystemMessage,
} from "langchain/schema";

import { LLMChain, ConversationChain } from "langchain/chains";
import { OpenAI } from "langchain/llms/openai";
import { ChatOpenAI} from "langchain/chat_models/openai";
import { BufferMemory, BufferWindowMemory  } from "langchain/memory";

import * as dotenv from 'dotenv';
dotenv.config();

@CommandHandler(SetChatCommand)
export class SetChatHandler implements ICommandHandler<SetChatCommand, ISetChatResponse> {
    constructor(
        // private readonly userRepository: ChatRepository,
        private readonly publisher: EventPublisher
    ) {}
    
    async execute(command: SetChatCommand): Promise<any> {

        const chatPrompt = ChatPromptTemplate.fromPromptMessages([
            SystemMessagePromptTemplate.fromTemplate(
                "You are an assistant that extract key characteristics of a user description of their dream house. Do not expand on the extracted characteristics." + 
                "If you can not extract at least 5 characteristics, you must ask the user to provide more information and provide them with some examples." +
                "If the user provided enough information to extract at least 5 characteristics, always ask for more detail about those characteristics and provide detailed examples." +    
                "Always end by asking the user if they are happy with the characteristics you extracted."
            ),
            new MessagesPlaceholder('history'),
            HumanMessagePromptTemplate.fromTemplate("{description}"),
        ]);

        const chat = new ChatOpenAI({});

        const conversationChain = new ConversationChain({
            memory: new BufferWindowMemory({
                returnMessages: true,
                memoryKey: "history",
                k: 5,
            }),
            prompt: chatPrompt,
            llm: chat,
        })


        const res = await conversationChain.call({
            description: command.request.chat.message,
        }) as { response: string};

        // console.log(res);

        const response: ISetChatResponse = {
            chat: {
                username: command.request.chat.username,
                message: res.response
            }
        };

        return response;
    }
}