// import { ChatRepository } from "@estate-match/api/chat/data-access";
import { SetChatCommand, ISetChatResponse } from "@estate-match/api/chat/util";
import { CommandHandler, ICommandHandler, EventPublisher } from "@nestjs/cqrs";
import {
    ChatPromptTemplate,
    SystemMessagePromptTemplate,
    AIMessagePromptTemplate,
    HumanMessagePromptTemplate,
    MessagesPlaceholder
} from "langchain/prompts";

import {
    ChatAgent,
    initializeAgentExecutorWithOptions,
    AgentExecutor,
} from "langchain/agents";

import {
    SerpAPI
} from "langchain/tools";

import { ConversationChain } from "langchain/chains";
import { ChatOpenAI} from "langchain/chat_models/openai";
import { BufferWindowMemory  } from "langchain/memory";

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

        const tools = [
            new SerpAPI(process.env["SERP_API_KEY"], {
                hl: "en",
                gl: "us",
            })
        ];

        const agent = ChatAgent.fromLLMAndTools(chat, tools);

        const agentExecutor = AgentExecutor.fromAgentAndTools({
            agent: agent,
            tools: tools,
        });

        const testRes = await agentExecutor.run("How many people live in the US in 2023?");
        console.log(testRes);

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