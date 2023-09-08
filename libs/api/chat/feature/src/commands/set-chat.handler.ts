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

        const featureExtractorTemplate = new PromptTemplate({
            template: "You are an assistant that should get the characteristics of a users dream home based on a description they provide. The description is: {description}." +
            "You need to extract at least 5 characteristics of the home. The characteristics to extract are suppose to be finer details for example if the user description states they like wood floors, " +
            "Try and pin point the colour of wood floors they like and if they like it in all the rooms. If you can not extract this information, you can ask the user for more information. If you can not extract " +
            "at least 5 characteristics, you must ask the user for more information.",
            inputVariables: ["description"],
        });

        const chatPrompt = ChatPromptTemplate.fromPromptMessages([
            SystemMessagePromptTemplate.fromTemplate(
                "You are an assistant that extract key characteristics of a user description of their dream house. If you can not extract at least 5 characteristics, you must ask the user for more information."
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
        });

        console.log(res);

        // const chatPrompt = ChatPromptTemplate.fromPromptMessages([
        // SystemMessagePromptTemplate.fromTemplate(
        //     "You are a helpful assistant that translates {input_language} to {output_language}."
        // ),
        // HumanMessagePromptTemplate.fromTemplate("{text}"),
        // ]);
        // const chain = new LLMChain({
        //     prompt: featureExtractorTemplate,
        //     llm: chat,
        //     memory: memory,
        //     verbose: true,
        // });

        // const characteristics = await chain.call({
        //     description: command.request.chat.message,
        // })

        // console.log(characteristics);

        // const characteristicsA = characteristics['text'].split('\n-'); //This is what will be used for the model

        const response: ISetChatResponse = {
            chat: {
                username: command.request.chat.username,
                message: 'Under construction'
                // message: 'Based on your description, I have extracted the following features: ' + characteristics['text']
            }
        };

        return response;
    }
}