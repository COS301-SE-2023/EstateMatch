import { TranslateCommand, ITranslateResponse } from "@estate-match/api/translation/util";
import { CommandHandler, ICommandHandler, EventPublisher } from "@nestjs/cqrs";
import { LLMChain } from "langchain/chains";
import { ChatOpenAI} from "langchain/chat_models/openai";
import {
    PromptTemplate,
    ChatPromptTemplate,
    SystemMessagePromptTemplate,
    HumanMessagePromptTemplate,
    MessagesPlaceholder,
    AIMessagePromptTemplate
} from "langchain/prompts";

import * as dotenv from 'dotenv';
dotenv.config();

@CommandHandler(TranslateCommand)
export class TranslateHandler implements ICommandHandler<TranslateCommand, ITranslateResponse> {
    constructor(
        private readonly publisher: EventPublisher
    ) {}
    
    async execute(command: TranslateCommand): Promise<ITranslateResponse> {
        const text = command.request.text;
        const languageAbriviation = command.request.targetLanguage;
        let language = '';

        switch(languageAbriviation) {
            case 'en': language = 'english'; break;
            case 'af': language = 'afrikaans'; break;
            case 'zu': language = 'zulu'; break;
            case 'xh': language = 'xhosa'; break;
            case 'st': language = 'sesotho'; break;
            case 'tn': language = 'tswana'; break;
        }

        const model = new ChatOpenAI({});
        const myTemplate = "You are an assistant that tranlates {text} from english to {output_language}";

        const prompt = PromptTemplate.fromTemplate(myTemplate);

        const llm = new LLMChain({
            llm: model,
            prompt: prompt,	
        });

        const translatedText = await llm.call({text: text, output_language: language}) as {text: string};


        const response: ITranslateResponse = {
            text: translatedText.text,
        };

        return response;
    }
}