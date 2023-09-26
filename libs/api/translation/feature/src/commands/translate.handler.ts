import { TranslateCommand, ITranslateResponse } from "@estate-match/api/translation/util";
import { CommandHandler, ICommandHandler, EventPublisher } from "@nestjs/cqrs";
import { LLMChain } from "langchain/chains";
import { ChatOpenAI} from "langchain/chat_models/openai";
import {
    PromptTemplate,
} from "langchain/prompts";
import axios from "axios";
import * as dotenv from 'dotenv';
dotenv.config();

const RAPID_API_KEY = process.env['X_RAPID_API_KEY'];
const RAPID_API_HOST = process.env['X_RAPID_API_HOST'];


@CommandHandler(TranslateCommand)
export class TranslateHandler implements ICommandHandler<TranslateCommand, ITranslateResponse> {
    constructor(
        private readonly publisher: EventPublisher
    ) {}
    
    async execute(command: TranslateCommand): Promise<ITranslateResponse> {
        const title = command.request.title;
        const description = command.request.description;
        const amenities = command.request.amenities;
        const aiLabel = command.request.aiLabel;
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
        // const options = {
        //     method: 'GET',
        //     url: 'https://translated-mymemory---translation-memory.p.rapidapi.com/get',
        //     params: {
        //       langpair: 'en' + '|' + languageAbriviation,
        //       q: text,
        //       mt: '1',
        //       onlyprivate: '0',
        //       de: 'a@b.c'
        //     },
        //     headers: {
        //       'X-RapidAPI-Key': RAPID_API_KEY,
        //       'X-RapidAPI-Host': RAPID_API_HOST
        //     }
        //   };
          

        //     const translated = await axios.request(options);
        //     const response: ITranslateResponse = {
        //         text: translated.data.responseData.translatedText,
        //     };
    
        //     return response;

        const model = new ChatOpenAI({});
        const myTemplate = "You are an assistant that tranlates an array of strings {data} from english to {output_language}. Only provide the transletd text as a response.";
        // "Examples:" + 
        // "Data: [3 Bedroom house for sale in Cape Town, Bedroom, Garden]" + 
        // "Assistant: [3 Slaapkamer huis te koop in Kaapstad, Slaapkamer, Tuin]";

        const prompt = PromptTemplate.fromTemplate(myTemplate);

        const llm = new LLMChain({
            llm: model,
            prompt: prompt,	
        });
        
        const data = [];
        data.push(title);
        if(description){
            for(const d of description){
                data.push(d);
            }            
        }

        if(amenities){
            for(const a of amenities){
                data.push(a);
            }
        }    
        
        if(aiLabel){
            for(const a of aiLabel){
                data.push(a);
            }
        }

        const translated = await llm.call({data: data, output_language: language}) as {text: string};
        // const translatedDescription = await llm.call({data: description, output_language: language}) as {text: string};
        // const translatedAmenities = await llm.call({data: amenities, output_language: language}) as {text: string};
        // const translatedAiLabel = await llm.call({data: aiLabel, output_language: language}) as {text: string};

        const translatedData = translated.text.split(', ');

        const translatedTitle = translatedData[0];

        const translatedDescription = [];
        const translatedAmenities = [];
        const translatedAiLabel = [];

        let index = 1;

        if(description){
            for(let i = 0; i < description.length; i++){
                translatedDescription.push(translatedData[index]);
                index++;
            }            
        }

        if(amenities){
            for(let i = 0; i < amenities.length; i++){
                translatedAmenities.push(translatedData[index]);
                index++;
            }
        }

        if(aiLabel){
            for(let i = 0; i < aiLabel.length; i++){
                translatedAiLabel.push(translatedData[index]);
                index++;
            }
        }

        const response: ITranslateResponse = {
            title: translatedTitle,
            amenities: translatedAmenities,
            description: translatedDescription,
            aiLabel: translatedAiLabel,
        };

        return response;
    }
}