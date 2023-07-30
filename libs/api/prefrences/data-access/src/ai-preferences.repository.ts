import { AIPrefrencesModel } from "@estate-match/api/prefrences/schema";
import { Inject, Injectable, NotImplementedException } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { IAIPreference } from "@estate-match/api/prefrences/util";

@Injectable()
export class AIPreferencesRepository {
    constructor(@InjectModel('AIPrefrences') private readonly aiPrefrencesModel : Model<AIPrefrencesModel>){}

    async findOne(user: string) : Promise<AIPrefrencesModel | null> {
        const result =  await this.aiPrefrencesModel.findOne({user: user});
        return result ? result.toObject() : null;
    }   

    async create(aiPrefrences : IAIPreference) : Promise<AIPrefrencesModel> {
        const newRecord: AIPrefrencesModel = {
            user: aiPrefrences.user,
            colourDataPoints: [aiPrefrences.colour],
            colour: aiPrefrences.colour,
        }

        const createdPrefrences = new this.aiPrefrencesModel(newRecord);
        return createdPrefrences.save();
    }

    async update(id : string, prefrences : IAIPreference) : Promise<AIPrefrencesModel | null> {
        const userAIPreferences = await this.aiPrefrencesModel.findOne({user: id});

        if(!userAIPreferences) {
            return null;
        }else{
            userAIPreferences.colourDataPoints.push(prefrences.colour);
            const colourDataPoints = userAIPreferences.colourDataPoints;
            let colourful = 0;
            let light = 0;
            let dark = 0;
            for(let i = 0; i < colourDataPoints.length; i++) {
                if(colourDataPoints[i] === 'Colourful') {
                    colourful++;
                }else if(colourDataPoints[i] === 'Light'){
                    light++;
                }else{
                    dark++;
                }
            }

            return await userAIPreferences.save();
        }

        return null;
    }
}