import { LikedPropertyModel } from "@estate-match/api/properties/schema";
import { Inject, Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class LikedPropertiesRepository {
    constructor (@InjectModel('LikedProperties') private readonly likedPropertiesModel : Model<LikedPropertyModel>){}
    //functions 
    //handle request to set liked property
    async setLikedProperty(likedProperty : LikedPropertyModel) : Promise<LikedPropertyModel> {
        const createdLikedProperty = new this.likedPropertiesModel(likedProperty);
        return createdLikedProperty.save();
    }
}