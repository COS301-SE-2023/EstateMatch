import { AIPrefrencesModel } from "@estate-match/api/prefrences/schema";
import { Inject, Injectable, NotImplementedException } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class AIPreferencesRepository {
    constructor(@InjectModel('Prefrences') private readonly aiPrefrencesModel : Model<AIPrefrencesModel>){}

   async findOne() : Promise<AIPrefrencesModel[]> {
    console.log("findAll");
    return await this.aiPrefrencesModel.find().exec();
   }   

//    async create(aiPrefrences : AIPrefrencesModel) : Promise<AIPrefrencesModel> {
//    }
}