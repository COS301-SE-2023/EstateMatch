// import { ChatRepository } from "@estate-match/api/chat/data-access";
import { SetChatCommand, ISetChatResponse } from "@estate-match/api/chat/util";
import { CommandHandler, ICommandHandler, EventPublisher } from "@nestjs/cqrs";
import {
    ChatPromptTemplate,
    SystemMessagePromptTemplate,
    HumanMessagePromptTemplate,
    MessagesPlaceholder,
    AIMessagePromptTemplate
} from "langchain/prompts";

import {
    initializeAgentExecutorWithOptions,
} from "langchain/agents";

import {
    SerpAPI,
    DynamicTool
} from "langchain/tools";

import { Calculator } from "langchain/tools/calculator";

import { ConversationChain, LLMChain } from "langchain/chains";
import { ChatOpenAI} from "langchain/chat_models/openai";
import { BufferWindowMemory, ChatMessageHistory  } from "langchain/memory";

import { AIPreferencesRepository, PreferencesRepository } from "@estate-match/api/prefrences/data-access";

import * as dotenv from 'dotenv';
import { cos } from "@tensorflow/tfjs-node";
dotenv.config();

@CommandHandler(SetChatCommand)
export class SetChatHandler implements ICommandHandler<SetChatCommand, ISetChatResponse> {
    constructor(
        private readonly aiPreferenceRepo: AIPreferencesRepository,
        private readonly preferencesRepo: PreferencesRepository,
        private readonly publisher: EventPublisher,
    ) {}
    
    chatMessageHistory = new ChatMessageHistory();
    chatMessagePlaceholder = new MessagesPlaceholder("chat_history");

    async execute(command: SetChatCommand): Promise<any> {
        const chat = new ChatOpenAI({
            temperature: 0,
            // streaming: true,
            // callbacks: [
            //     {
            //         handleLLMNewToken(token: string) {
            //             process.stdout.write(token);
            //         },
            //     }
            // ]
        });

        const myTemplate = "You are a friendly assistant to help a user find their dream house, with the following tasks." + 
        "1) Extract five or more charcateristics from a description." +
        "2) If less than five characteristics are extracted, ask the user to provide more information about their dream house and provide them with a short example." +
        "3) If five or more characteristics are extracted, ask the user to provide more information about those characteristics if they are not detailed enough." +
        "4) End your response with a joke." + 
        "Examples:" + 
        "Example 1:" + 
        "User: I want a house with a pool." +
        "Assistant: I see you want a house with a pool. In order for me to be helpful I need at least five characteristics. Here is a nice example of possible description: "+ 
        "A quaint, two-story abode adorned in pastel hues, nestled amid a lush garden, featuring a rustic porch, bay windows, and a charming shingle roof" + 
        "Why don't skeletons fight each other? They don't have the guts!" + 
        "Example 2:" +
        "User: I like floors, open floor and a patio, big windows and a pool" + 
        "Assistant: I cherish homes with stunning dark hardwoodfloors, an expansive open layout, a relaxing patio, ample natural light through big windows, and the icing on the cake—a sparkling pool." +
        "I told my wife she was drawing her eyebrows too high. She looked surprised."; 

        const chatMemory = new BufferWindowMemory({
            chatHistory: this.chatMessageHistory,
            returnMessages: true,
            memoryKey: "chat_history",
            k: 5,
        })

        const tools = [
            // serpApi,
            new Calculator(),
            new DynamicTool({
                name: "follow-up",
                description: "Call this agent when none of the other agents are suitable",
                func: async() => {
                    console.log(chatMemory);
                    return "The user provide more information about a property."
                },
                returnDirect: true,
            }),
            // new DynamicTool({
            //     name: "describe-user",
            //     description: "Call this agent when the user asks to describe their dream house based on the chat history.",
            //     func: async() => {
            //         const chatPrompt = ChatPromptTemplate.fromPromptMessages([
            //             SystemMessagePromptTemplate.fromTemplate(
            //                 "You are an assistant that makes use of the chat memory form a description of the users dream House."
            //             ),
            //             // chatMemoryPlaceHolder,
            //             // AIMessagePromptTemplate.fromTemplate("{description}"),
            //             HumanMessagePromptTemplate.fromTemplate("{description}"),
            //         ]);

            //         const llm = new ConversationChain({
            //             // memory: chatMemory,
            //             prompt: chatPrompt ,
            //             llm: chat,
            //         });

                    
            //         const res = await llm.call({description: "Ignore this"}) as { response: string};
            //         console.log(res);

            //         return "Under construction"
            //     },
            //     returnDirect: true,
            // }),
            new DynamicTool({
                name: "describe-dream-house",
                description: "Call this agent when the user asks to describe their dream house.",
                func: async() => {
                    const userAiPref = await this.aiPreferenceRepo.findOne(command.request.chat.username);
                    const userPref = await this.preferencesRepo.findOne(command.request.chat.username);


                    const chatPrompt = ChatPromptTemplate.fromPromptMessages([
                        SystemMessagePromptTemplate.fromTemplate(
                            "You are an assistant that get an array of descriptive words from the user based on their dream house. Your job is to write a description of the users dream house based on the descriptive words they provide." +
                            "At the end of the description ask the user if the description is accurate or if they like to change or add anything to the description."
                        ),
                        HumanMessagePromptTemplate.fromTemplate("{descriptive_words}"),
                    ]);

                    const llm = new ConversationChain({
                        llm: chat,
                        prompt: chatPrompt,
                    });

                    const descriptive_words = [];
                    // descriptive_words.push(userAiPref?.colour);
                    if(userPref){
                        descriptive_words.push(userPref.location);
                        descriptive_words.push(userPref.budgetMin);
                        descriptive_words.push(userPref.budgetMax);
                        descriptive_words.push(userPref.bedrooms);
                        descriptive_words.push(userPref.bathrooms);
                        descriptive_words.push(userPref.garages);
                        
                        for(let i = 0; i < userPref.extras.length; i++) {
                            descriptive_words.push(userPref.extras[i]);
                        }
                    }

                    descriptive_words.push("Hardwood floors");
                    descriptive_words.push("Open floor plan");
                    descriptive_words.push("High ceilings");
                    descriptive_words.push("Large windows");
                    const res = await llm.call({descriptive_words: descriptive_words}) as { response: string};
                    console.log(res.response);

                    return res.response;
                },
                returnDirect: true,
            }),

            // "You are an assistant that extract key characteristics of a user description of their dream house. Do not expand on the extracted characteristics." + 
            // "If you can not extract at least 5 characteristics, you must ask the user to provide more information and provide them with some examples." +
            // "If you have extracted at least 5 characteristics ask for more detail about those characteristics and provide detailed examples." +
            // "Always end by asking the user if they are happy with the characteristics you extracted."
            new DynamicTool({
                name: "extract-characteristics",
                description: "Call this agent when the user is providing information about characteristics of their dream house.",
                func: async () => {
                    const chatPrompt = ChatPromptTemplate.fromPromptMessages([
                        SystemMessagePromptTemplate.fromTemplate(
                            myTemplate
                        ),
                        this.chatMessagePlaceholder,
                        HumanMessagePromptTemplate.fromTemplate("{description}"),
                    ]);
            
                    const llm = new ConversationChain({
                        memory: chatMemory,
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

        const res = await agentExecutor.call({input: command.request.chat.message});
        // console.log(chatMemory.chatHistory.getMessages());

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