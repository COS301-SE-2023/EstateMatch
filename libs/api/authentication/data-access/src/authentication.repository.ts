import { AuthenticationModel } from "@estate-match/api/authentication/schema";
import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthRepository {
    constructor(@InjectModel('Authentication') private readonly authModel : Model<AuthenticationModel>){}

    async findOne(id : string, pass: string) : Promise<AuthenticationModel | null> {
        const result = await this.authModel.findOne({username: id});
        if(result){
            const match = await bcrypt.compare(pass, result?.password);
            if(match){
                return result;	
            }else{
                return null;
            }            
        }else{
            return null;
        }

    }

    // async create(prefrences : PrefrencesModel) : Promise<PrefrencesModel> {
    //     const createdPrefrences = new this.prefrencesModel(prefrences);
    //     return createdPrefrences.save();
    // }
}