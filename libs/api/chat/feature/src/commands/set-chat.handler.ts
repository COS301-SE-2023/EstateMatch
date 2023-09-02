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
import { OpenAI } from "langchain/llms/openai";
import { HfInference } from '@huggingface/inference';
import { HuggingFaceInference } from 'langchain/llms/hf';
import * as dotenv from 'dotenv';
dotenv.config();


const hf = new HfInference(process.env['HF_API_LLM"']);


@CommandHandler(SetChatCommand)
export class SetChatHandler implements ICommandHandler<SetChatCommand, ISetChatResponse> {
    constructor(
        // private readonly userRepository: ChatRepository,
        private readonly publisher: EventPublisher
    ) {}
    
    async execute(command: SetChatCommand): Promise<any> {
        const featureExtractorTemplate = new PromptTemplate({
            template: "Extract the key features out of the house description. Skip any basic features that all homes have and rather focus on the extra details. Limit it to 3 words per feature. The description is: {description}",
            inputVariables: ["description"],
        });

        // const chat = new HuggingFaceInference({
        //     model: "google/flan-t5-base",
        //     apiKey: process.env['HF_API_LLM'],
        //     maxTokens: 10,
        // });

        // const chatPrompt = new PromptTemplate({
        //     template: "Q: {question}",
        //     inputVariables: ["question"],
        // });

        // const chainB = new LLMChain({
        //   prompt: chatPrompt,
        //   llm: chat,

        // });

        // const resB = await chainB.call({
        //     question: "Which NFL team won the Super Bowl in the 2010 season?",
        // });
        // console.log(resB);

        // We can also construct an LLMChain from a ChatPromptTemplate and a chat model.
        const chat = new OpenAI({
            modelName: "text-davinci-002",
            temperature: 0,
            maxTokens: 100,
        });

        // const chatPrompt = ChatPromptTemplate.fromPromptMessages([
        // SystemMessagePromptTemplate.fromTemplate(
        //     "You are a helpful assistant that translates {input_language} to {output_language}."
        // ),
        // HumanMessagePromptTemplate.fromTemplate("{text}"),
        // ]);
        const chainB = new LLMChain({
            prompt: featureExtractorTemplate,
            llm: chat,
        });

        // console.log(command.request.chat.message);

        const resB = await chainB.call({
            description: command.request.chat.message,
        });
        console.log({ resB });
        // const res = await model.call("When is the 2023 Rugby World Cup?");
        // console.log({ res });
    }
}