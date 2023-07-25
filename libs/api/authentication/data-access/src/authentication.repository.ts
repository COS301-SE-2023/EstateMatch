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

    async create(account : AuthenticationModel) : Promise<AuthenticationModel | null> {
        const exist = await this.authModel.findOne({username: account.username});
        if(exist){
            return null;
        }else{
            const createdPrefrences = new this.authModel(account);
            return createdPrefrences.save();            
        }
    }
}