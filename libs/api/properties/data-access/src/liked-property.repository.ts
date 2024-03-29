import { LikedPropertiesModel } from "@estate-match/api/properties/schema";
import { Inject, Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class LikedPropertiesRepository {
    constructor (@InjectModel('LikedProperties') private readonly likedPropertiesModel : Model<LikedPropertiesModel>){}
    //functions 
    //handle request to set liked property
    async setLikedProperty(likedProperty : LikedPropertiesModel) : Promise<LikedPropertiesModel> {
        const exist = await this.likedPropertiesModel.findOne({title: likedProperty.title, user: likedProperty.user}).exec();

        if(exist){
            return likedProperty;
        }

        const createdLikedProperty = new this.likedPropertiesModel(likedProperty);
        return createdLikedProperty.save();
    }

    async getLikedProperties(user: string) : Promise<LikedPropertiesModel[]> {
        return this.likedPropertiesModel.find({user: user, liked: true}).exec();
    }
}