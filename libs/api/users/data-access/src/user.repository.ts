import { UserModel } from "@estate-match/api/users/schema";
import {  Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model} from "mongoose";

@Injectable()
export class UserRepository {
    constructor(@InjectModel('User') private readonly userModel : Model<UserModel>){}

    async findAll() : Promise<UserModel[]> {
        return await this.userModel.find().exec();
    }

    async findOne(id : string) : Promise<UserModel | null> {
        console.log(id);
        const result = await this.userModel.findOne({username: id});
        return result ? result.toObject() : null;
    }

    async create(user : UserModel) : Promise<UserModel> {
        const createdUser = new this.userModel(user);
        return createdUser.save();
    }

    //update user details
    async update(id : string,updateUser : Partial<UserModel>) : Promise<boolean> {
        try {
            const user = await this.findOne(id);

            if(!user){
                return false;
            }

            const updateUserData: UserModel = {
                ...user,
                ...updateUser,
    
            } 

            console.log(updateUserData);
            //perform update
            await this.userModel.updateOne({username: id}, updateUserData);
            return true;

            
        } catch (error) {
            console.log(error);
            return false;
        }
    }

}