import { AuthModel } from "@estate-match/api/authentication/schema";
import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class AuthRepository {
    constructor(@InjectModel('Authentication') private readonly authModel : Model<AuthModel>){}

    async findOne(id : string) : Promise<AuthModel | null> {
        const result = await this.authModel.findOne({user: id});
        return result ? result.toObject() : null;
    }

    // async create(prefrences : PrefrencesModel) : Promise<PrefrencesModel> {
    //     const createdPrefrences = new this.prefrencesModel(prefrences);
    //     return createdPrefrences.save();
    // }
}