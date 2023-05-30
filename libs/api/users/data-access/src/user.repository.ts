import { UserModel } from "@estate-match/api/users/schema";
import {  Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class UserRepository {
    constructor(@InjectModel('User') private readonly userModel : Model<UserModel>){}

    async findAll() : Promise<UserModel[]> {
        return await this.userModel.find().exec();
    }

    async findOne(id : string) : Promise<UserModel | null> {
        const result = await this.userModel.findOne({userID: id});
        return result ? result.toObject() : null;
    }

    async create(user : UserModel) : Promise<UserModel> {
        const createdUser = new this.userModel(user);
        return createdUser.save();
    }

}