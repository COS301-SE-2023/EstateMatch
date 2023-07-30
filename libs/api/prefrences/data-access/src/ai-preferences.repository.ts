import { AIPrefrencesModel } from "@estate-match/api/prefrences/schema";
import { Inject, Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class AIPreferencesRepository {
    constructor(@InjectModel('Prefrences') private readonly aiPrefrencesModel : Model<AIPrefrencesModel>){}

   async findAll() : Promise<AIPrefrencesModel[]> {
    return await this.aiPrefrencesModel.find().exec();
   }   
}