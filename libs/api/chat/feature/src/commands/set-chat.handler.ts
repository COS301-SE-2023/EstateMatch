// import { ChatRepository } from "@estate-match/api/chat/data-access";
import { SetChatCommand, ISetChatResponse } from "@estate-match/api/chat/util";
import { CommandHandler, ICommandHandler, EventPublisher } from "@nestjs/cqrs";
import {
    ChatPromptTemplate,
    SystemMessagePromptTemplate,
    HumanMessagePromptTemplate,
} from "langchain/prompts";

import {
    initializeAgentExecutorWithOptions,
} from "langchain/agents";

import {
    SerpAPI,
    DynamicTool
} from "langchain/tools";

import { Calculator } from "langchain/tools/calculator";

import { ConversationChain } from "langchain/chains";
import { ChatOpenAI} from "langchain/chat_models/openai";
import { BufferWindowMemory, ChatMessageHistory  } from "langchain/memory";

import { AIPreferencesRepository } from "@estate-match/api/prefrences/data-access";

import * as dotenv from 'dotenv';
dotenv.config();

@CommandHandler(SetChatCommand)
export class SetChatHandler implements ICommandHandler<SetChatCommand, ISetChatResponse> {
    constructor(
        private readonly aiPreferenceRepo: AIPreferencesRepository,
        private readonly publisher: EventPublisher,
    ) {}
    
    chatMessageHistory = new ChatMessageHistory();

    async execute(command: SetChatCommand): Promise<any> {

        const chat = new ChatOpenAI({
            temperature: 0,
        });

        const chatMemory = new BufferWindowMemory({
            chatHistory: this.chatMessageHistory,
            returnMessages: true,
            memoryKey: "chat_history",
            k: 5,
        })

        // const chatPrompt = ChatPromptTemplate.fromPromptMessages([
        //     SystemMessagePromptTemplate.fromTemplate(
        //         "You are an assistant that extract key characteristics of a user description of their dream house. Do not expand on the extracted characteristics." + 
        //         "If you can not extract at least 5 characteristics, you must ask the user to provide more information and provide them with some examples." +
        //         "If the user provided enough information to extract at least 5 characteristics, always ask for more detail about those characteristics and provide detailed examples." +    
        //         "Always end by asking the user if they are happy with the characteristics you extracted."
        //     ),
        //     HumanMessagePromptTemplate.fromTemplate("{description}"),
        // ]);

        // const llm = new ConversationChain({
        //     prompt: chatPrompt ,
        //     llm: chat,
        // })

        // const res = await llm.call({description: command.request.chat.message}) as { response: string};

        const tools = [
            // serpApi,
            new Calculator(),
            // new DynamicTool({
            //     name: "recommendation",
            //     description: "Call this agent when the user asks for a recommendation.",
            //     func: this.giveUserReccomendation,
            // }),
            new DynamicTool({
                name: "get-preferences",
                description: "Call this agent when the user asks what their preferences are.",
                func: async() => {
                    const userAiPref = await this.aiPreferenceRepo.findOne(command.request.chat.username);
                    return "Based on the data we have collected from your liked properties, your colour preference is: " + userAiPref?.colour + ".";
                },
                returnDirect: true,
            }),
            new DynamicTool({
                name: "extract-characteristics",
                description: "Call this agent when the user provides a description of their dream house. This agent will extract key characteristics of the user's description.",
                func: async () => {
                    const chatPrompt = ChatPromptTemplate.fromPromptMessages([
                        SystemMessagePromptTemplate.fromTemplate(
                            "You are an assistant that extract key characteristics of a user description of their dream house. Do not expand on the extracted characteristics." + 
                            "If you can not extract at least 5 characteristics, you must ask the user to provide more information and provide them with some examples." +
                            "If the user provided enough information to extract at least 5 characteristics, always ask for more detail about those characteristics and provide detailed examples." +    
                            "Always end by asking the user if they are happy with the characteristics you extracted."
                        ),
                        // new MessagesPlaceholder("chat_history"),
                        HumanMessagePromptTemplate.fromTemplate("{description}"),
                    ]);
            
                    const llm = new ConversationChain({
                        // memory: chatMemory,
                        prompt: chatPrompt ,
                        llm: chat,
                    })
            
                    const res = await llm.call({description: command.request.chat.message}) as { response: string};

                    return res.response;
                },
                returnDirect: true,
            }),
        ];

        const agentExecutor = await initializeAgentExecutorWithOptions(tools, chat, {
            agentType: "chat-conversational-react-description",
            memory: chatMemory,
            agentArgs: {
                inputVariables: ["chat_history"]
            }
            // verbose: true,
        });

        const res = await agentExecutor.call({input: command.request.chat.message})
        console.log(res["output"]);
        console.log(this.chatMessageHistory);

        const response: ISetChatResponse = {
            chat: {
                username: command.request.chat.username,
                message: res["output"]
                // message: res.response
            }
        };

        return response; 
    }

    // async extractCharacteristics(description: string): Promise<string> {
    //     const chat = new ChatOpenAI({
    //         temperature: 0,
    //     });

    //     const chatPrompt = ChatPromptTemplate.fromPromptMessages([
    //         SystemMessagePromptTemplate.fromTemplate(
    //             "You are an assistant that extract key characteristics of a user description of their dream house. Do not expand on the extracted characteristics." + 
    //             "If you can not extract at least 5 characteristics, you must ask the user to provide more information and provide them with some examples." +
    //             "If the user provided enough information to extract at least 5 characteristics, always ask for more detail about those characteristics and provide detailed examples." +    
    //             "Always end by asking the user if they are happy with the characteristics you extracted."
    //         ),
    //         HumanMessagePromptTemplate.fromTemplate("{description}"),
    //     ]);

    //     const conversationChain = new ConversationChain({
    //         prompt: chatPrompt ,
    //         llm: chat,
    //     })

    //     const res = await conversationChain.call({description: description}) as { response: string};

    //     return res.response;
    // }
}