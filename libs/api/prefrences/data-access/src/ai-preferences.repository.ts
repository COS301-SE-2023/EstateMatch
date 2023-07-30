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

    async update(id : string, prefrences : AIPrefrencesModel) : Promise<AIPrefrencesModel | null> {
        const updatedPrefrences = await this.aiPrefrencesModel.updateOne({user: id}, prefrences, {new : true}).exec();
        if(updatedPrefrences.modifiedCount >= 1) {
            return prefrences;
        }else{
            return null;
        }
    }
}