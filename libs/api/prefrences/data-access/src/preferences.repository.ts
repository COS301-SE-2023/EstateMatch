import { PrefrencesModel } from "@estate-match/api/prefrences/schema";
import { Inject, Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class PreferencesRepository {
    constructor(@InjectModel('Prefrences') private readonly prefrencesModel : Model<PrefrencesModel>){}

   async findAll() : Promise<PrefrencesModel[]> {
    return await this.prefrencesModel.find().exec();
   }

    async findOne(id : string) : Promise<PrefrencesModel | null> {
        const result = await this.prefrencesModel.findById(id).exec();
        return result ? result.toObject() : null;
    }

    async create(prefrences : PrefrencesModel) : Promise<PrefrencesModel> {
        const createdPrefrences = new this.prefrencesModel(prefrences);
        return createdPrefrences.save();
    }

    async update(id : string, prefrences : PrefrencesModel) : Promise<PrefrencesModel | null> {
        const updatedPrefrences = await this.prefrencesModel.findByIdAndUpdate(id, prefrences, {new : true}).exec();
        return updatedPrefrences ? updatedPrefrences.toObject() : null;
    }

    
}