// import { ChatRepository } from "@estate-match/api/chat/data-access";
import { SetChatCommand, ISetChatResponse } from "@estate-match/api/chat/util";
import { CommandHandler, ICommandHandler, EventPublisher } from "@nestjs/cqrs";
import {
    ChatPromptTemplate,
    SystemMessagePromptTemplate,
    HumanMessagePromptTemplate,
    MessagesPlaceholder,
    AIMessagePromptTemplate,
    PromptTemplate
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
import { ChatOpenAI } from "langchain/chat_models/openai";
import { OpenAI } from "langchain/llms/openai";
import { BufferWindowMemory, ChatMessageHistory  } from "langchain/memory";

import { AIPreferencesRepository, PreferencesRepository } from "@estate-match/api/prefrences/data-access";

import * as dotenv from 'dotenv';
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

        const test = await this.buildPreferenceModel("I like a house with a pool, a patio, large windows, and a big kitchen.");

        const extractTemplate = "You are a friendly assistant to help a user find their dream house, with the following tasks." + 
        "1) Extract five or more charcateristics from a description." +
        "2) If less than five characteristics are extracted, ask the user to provide more information about their dream house and provide them with a short example." +
        "3) If five or more characteristics are extracted, ask the user to provide more information about those characteristics if they are not detailed enough." +
        "4) When the user provide more information about the characteristics extract the extra information, provide them in a numbered list. End with a description of their dream house" + 
        "5) Limit response to 100 words." +
        "Examples:" + 
        "Example 1:" + 
        "User: I want a house with a pool." +
        "Assistant: I see you want a house with a pool. In order for me to be helpful I need at least five characteristics. Here is a nice example of possible description: "+ 
        "A quaint, two-story abode adorned in pastel hues, nestled amid a lush garden, featuring a rustic porch, bay windows, and a charming shingle roof" + 
        "Why don't skeletons fight each other? They don't have the guts!" + 
        "Example 2:" +
        "User: I like floors, open floor and a patio, big windows and a pool" + 
        "Assistant: I cherish homes with stunning dark hardwoodfloors, an expansive open layout, a relaxing patio, ample natural light through big windows, and the icing on the cake—a sparkling pool." +
        "I told my wife she was drawing her eyebrows too high. She looked surprised." + 
        "Example 3:" + 
        "User: I like floors, open floor and a patio, big windows and a pool" +
        "Assistant: Would you mind expanding on the characteristics you provided? For example a detailed description can be: " +
        "I cherish homes with stunning dark hardwoodfloors, an expansive open layout, a relaxing patio, ample natural light through big windows, and the icing on the cake—a sparkling pool." + 
        "User: For the floors I like dark hardwood floors. For the open floor I like an expansive open layout. For the patio I like a relaxing patio. For the windows I like ample natural light through big windows. For the pool I like a sparkling pool." + 
        "Assistant: Thank you for the extra information. Here is a possible description of your dream house: " + 
        "The rich allure of dark hardwood floors embraces you upon entry, setting the tone for luxury and warmth. The expansive open floor plan seamlessly intertwines the living, dining, and kitchen areas, promoting a sense of togetherness and fostering an airy ambiance. As you step outside, a relaxing spacious patio unfolds, adorned with plush seating and surrounded by lush greenery. " + 
        "Here, the soft melodies of nature serenade, while the gentle breeze invites you to unwind, making this outdoor oasis the perfect haven for tranquility and cherished gatherings."; 

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
                name: "describe-dream-house",
                description: "Call this agent only when the user asks you to describe their dream house.",
                func: async() => {
                    const userAiPref = await this.aiPreferenceRepo.findOne(command.request.chat.username); // need to incorporate this
                    const userPref = await this.preferencesRepo.findOne(command.request.chat.username);
                    console.log("Dream description agent");

                    const chatPrompt = ChatPromptTemplate.fromPromptMessages([
                        SystemMessagePromptTemplate.fromTemplate(
                            "You are an assistant that get an array of descriptive words from the user based on their dream house. Your job is to write a description of the users dream house based on the descriptive words they provide." +
                            "At the end of the description ask the user if the description is accurate or if they like to change or add anything to the description. Limit your response to 150 words."
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
                    console.log("Extract description agent");
                    const chatPrompt = ChatPromptTemplate.fromPromptMessages([
                        SystemMessagePromptTemplate.fromTemplate(
                            extractTemplate
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
    async buildPreferenceModel(description: string): Promise<string> {
        const model = new OpenAI({});
        const myTemplate = 
                "You are an assistant that extract key characteristics of a description of a house." + 
                "The description is: {description}" + 
                "Limit each characteristic to 4 words and provide your response as a numbered list."; 

        const prompt = PromptTemplate.fromTemplate(myTemplate);

        const llm = new LLMChain({
            llm: model,
            prompt: prompt,
        });

        const res = await llm.call({description: description}) as { text: string};
        console.log(res.text);

        return "Under construction";
    }
}