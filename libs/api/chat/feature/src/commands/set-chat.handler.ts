// import { ChatRepository } from "@estate-match/api/chat/data-access";
import { SetChatCommand, ISetChatResponse } from "@estate-match/api/chat/util";
import { CommandHandler, ICommandHandler, EventPublisher } from "@nestjs/cqrs";
import {
    ChatPromptTemplate,
    SystemMessagePromptTemplate,
    HumanMessagePromptTemplate,
    MessagesPlaceholder,
    PromptTemplate
} from "langchain/prompts";

import {
    initializeAgentExecutorWithOptions,
} from "langchain/agents";

import {
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

interface IExtractedModel {
    flooring: string[];
    buildingStyle: string[];
    buildingType: string[];
    buildingArea: string[];
    buildingFeatures: string[];
    materials: string[];
    roof: string;
    garden: string[];
    additional: string[];
}

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


        const extractTemplate = "You are a friendly assistant to help a user find their dream house, with the following tasks." + 
        "1) Extract five or more charcateristics from a description." +
        "2) If less than five characteristics are extracted, ask the user to provide more information about their dream house and provide them with a short example." +
        "3) If five or more characteristics are extracted, ask the user to provide more information about those characteristics if they are not detailed enough." +
        "4) When the user provide more information about the characteristics extract the extra information, provide them in a numbered list. End with a description of their dream house" + 
        "5) If the description provided by the user is well detailed, provide them with your own description, inform them that they provided enough information and instruct them to use the app more before chatting with you again."
        "6) Limit response to 100 words." +
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
        "Here, the soft melodies of nature serenade, while the gentle breeze invites you to unwind, making this outdoor oasis the perfect haven for tranquility and cherished gatherings." +
        "Example 4:" + 
        "User: For my dream house I would like a single story modern house with a view of the city. I would prefer an open floor plan including the kitchen, dining room and living room. For the floors I like dark hardwood floors. The interior should be modern" + 
        "Assistant: I understand that you are looking for a single-story modern house with a view of the city. You prefer an open floor plan that includes the kitchen, dining room, and living room. You also mentioned that you like dark hardwood floors and a modern interior. Here is a possible description of your dream house: " + 
        "Perched on a hilltop, this single-story modern masterpiece offers breathtaking panoramic views of the city skyline. The open floor plan seamlessly connects the kitchen, dining room, and living room, creating a spacious and inviting atmosphere for entertaining and relaxation. " + 
        "The rich allure of dark hardwood floors adds a touch of elegance and sophistication to the interior, while the modern design elements create a sleek and stylish ambiance. Every corner of this home is thoughtfully designed to maximize the city views, allowing you to enjoy the beauty of the urban landscape from the comfort of your own sanctuary." + 
        "Thanks for the detailed description, please use the app more, so that I can get more information of what you like,() before chatting with me again."; 

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
                    
                    // console.log(res.response);
                    
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

        // const res = await agentExecutor.call({input: command.request.chat.message});
        // console.log(chatMemory.chatHistory.getMessages());

        const response: ISetChatResponse = {
            chat: {
                username: command.request.chat.username,
                // message: res["output"]
                message: "Under construction"
            }
        };

        const test = await this.buildPreferenceModel(command.request.chat.message);
        return response; 
    }

    async buildPreferenceModel(description: string): Promise<string> {
        const model = new OpenAI({});
        const myTemplate = 
                "You are an assistant that extract key characteristics of a description of a house." + 
                "The description is: {description}" + 
                "Limit each characteristic to 4 words and provide your response as a bullet point list."; 

        const prompt = PromptTemplate.fromTemplate(myTemplate);

        const llm = new LLMChain({
            llm: model,
            prompt: prompt,
        });

        const res = await llm.call({description: description}) as { text: string};
        const temp = res.text.replace(/[\r\n]/gm, "");
        const characteristics = temp.split("- ");
        // console.log(characteristics);
    

        const classifyTemplate = "You are an assistant that classify characteristics of a description of a house. The characteristics are: {characteristics}" + 
        "You will recieve the characteristics as an array of strings." + 
        "You have to classify each element as one of the following: " +
        "Flooring," +
        "Building Style," + 
        "Building Type," +
        "Building Area," +
        "Building Features," +
        "Materials," +
        "Roof," +
        "Garden," +
        "Additional" + 
        "Format the answer as a numbered list."
        "Examples: " + 
        "Assistant: - Hardwood floors: Flooring" +
        "- Open floor plan: Building Features" + 
        "- High ceilings: Building Features" + 
        "- Large windows: Building Features" + 
        "- Tatch Roof: Roof";


        const chatPrompt = ChatPromptTemplate.fromPromptMessages([
            SystemMessagePromptTemplate.fromTemplate(
                classifyTemplate
            ),
            HumanMessagePromptTemplate.fromTemplate("{characteristics}"),
        ]);

        const classifyLLm = new LLMChain({
            llm: model,
            prompt: chatPrompt,
        });


        const classes = await classifyLLm.call({characteristics: characteristics}) as { text: string};
        console.log(classes.text);

        const classesArray = classes.text.split(/\d+\./).filter(item => item.trim() !== '');
        console.log(classesArray);

        const extractedModel: IExtractedModel = {
            flooring: [],
            buildingStyle: [],
            buildingType: [],
            buildingArea: [],
            buildingFeatures: [],
            materials: [],
            roof: "",
            garden: [],
            additional: [],
        };

        // console.log(classesArray);

        classesArray.forEach(element => {
            if(element !== ''){
                if(element.includes("Flooring")){
                    extractedModel.flooring.push(element.replace("Flooring", ""));
                }else if(element.includes("Building Style")){
                    extractedModel.buildingStyle.push(element.replace("Building Style", ""));
                }else if(element.includes("Building Type")){
                    extractedModel.buildingType.push(element.replace("Building Type", ""));
                }else if(element.includes("Building Area")){
                    extractedModel.buildingArea.push(element.replace("Building Area", ""));
                }else if(element.includes("Building Features")){
                    extractedModel.buildingFeatures.push(element.replace("Building Features", ""));
                }else if(element.includes("Materials")){
                    extractedModel.materials.push(element.replace("Materials", ""));
                }else if(element.includes("Roof")){
                    extractedModel.roof = element.replace("Roof", "");
                }else if(element.includes("Garden")){
                    extractedModel.garden.push(element.replace("Garden", ""));
                }else if(element.includes("Additional")){
                    extractedModel.additional.push(element.replace("Additional", ""));
                }
            }
        });

        // console.log(extractedModel);
        //From the classes need to create some sort of interface
        


        return "Under construction";
    }
}