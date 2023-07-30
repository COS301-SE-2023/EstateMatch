import { AIPrefrencesModel } from "@estate-match/api/prefrences/schema";
import { Inject, Injectable, NotImplementedException } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class AIPreferencesRepository {
    constructor(@InjectModel('Prefrences') private readonly aiPrefrencesModel : Model<AIPrefrencesModel>){}

   async findOne(user: string) : Promise<AIPrefrencesModel | null> {
    console.log("findAll");
    const result =  await this.aiPrefrencesModel.findOne({user: user});
    return result ? result.toObject() : null;
   }   

//    async create(aiPrefrences : AIPrefrencesModel) : Promise<AIPrefrencesModel> {
//    }
}