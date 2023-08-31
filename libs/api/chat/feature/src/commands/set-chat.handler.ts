// import { ChatRepository } from "@estate-match/api/chat/data-access";
import { SetChatCommand, ISetChatResponse } from "@estate-match/api/chat/util";
import { CommandHandler, ICommandHandler, EventPublisher } from "@nestjs/cqrs";
import { 
    ChatPromptTemplate,
    PromptTemplate,
    HumanMessagePromptTemplate,
    SystemMessagePromptTemplate, } from "langchain/prompts";
import { LLMChain } from "langchain/chains";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { HfInference } from '@huggingface/inference';
import { HuggingFaceInference } from 'langchain/llms/hf';

const hf = new HfInference(process.env['HF_API_LLM"']);


@CommandHandler(SetChatCommand)
export class SetChatHandler implements ICommandHandler<SetChatCommand, ISetChatResponse> {
    constructor(
        // private readonly userRepository: ChatRepository,
        private readonly publisher: EventPublisher
    ) {}
    
    async execute(command: SetChatCommand): Promise<any> {
        // const featureExtractorTemplate = new PromptTemplate({
        //     template: "You are a assistant that recieve a description of a house and you need to extract the key features of the house. The description is: {description}",
        //     inputVariables: ["description"],
        // });

        const chat = new HuggingFaceInference({
            model: "t5-base",
            temperature: 0.5,
            maxTokens: 256,
            apiKey: process.env['HF_API_LLM'],
            
        });

        const chatPrompt = ChatPromptTemplate.fromPromptMessages([
          SystemMessagePromptTemplate.fromTemplate(
            "You are a helpful assistant that translates {input_language}"
          ),
          HumanMessagePromptTemplate.fromTemplate("{text}"),
        ]);

        const chainB = new LLMChain({
          prompt: chatPrompt,
          llm: chat,

        });

        const resB = await chainB.call({
          input_language: "English",
          text: "My name is Wolfgang and I live in Berlin",
        });
        console.log(resB);
    }
}