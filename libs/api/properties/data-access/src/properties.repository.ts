import { PropertiesModel } from "@estate-match/api/properties/schema";
import { PrefrencesModel } from "@estate-match/api/prefrences/schema";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ISearch, ISearchRequest } from "@estate-match/api/search/util";
import { ICreatePropertyRequest, IPropSearch, IProperty } from "@estate-match/api/properties/util";
import {UserModel} from "@estate-match/api/users/schema";

@Injectable()
export class PropertiesRepository {
    constructor(@InjectModel('Properties') private readonly propertiesModel: Model<PropertiesModel>
    , @InjectModel('Prefrences') private readonly preferenceModel: Model<PrefrencesModel>
    , @InjectModel('User') private readonly userModel: Model<UserModel>
    ) {}

    async createProperty(request: ICreatePropertyRequest): Promise<PropertiesModel> {
        const property = request.property;
        const user = request.username;
         console.log(user)
        const createdProperty = new this.propertiesModel(property);
        let reponseProperty : any;
        
        const propertyExists = await this.propertiesModel.findOne(
          {
            title: property.title,
            location: property.location,
            price: property.price,
            bedrooms: property.bedrooms,
            bathrooms: property.bathrooms,
            garages: property.garages,
            amenities: property.amenities,
            images: property.images,
            seen: property.seen
          }).exec();

        if(propertyExists) {
            //finding user where it exists in the property collection
            const userExists = await this.propertiesModel.findOne(
              {$and: [{
                title: property.title,
                location: property.location,
                price: property.price,
                bedrooms: property.bedrooms,
                bathrooms: property.bathrooms,
                garages: property.garages,
                amenities: property.amenities,
                images: property.images,
                seen: property.seen
              }
                , {user: {$in: user}}]}).exec();
          if(userExists) {
            console.log('Property already exists for this existing user');
          }
          else {
            // console.log(property.title)
            // add user to existing property
            const updatedProperty = await this.propertiesModel.findOneAndUpdate(
              { title: property.title},
              { $addToSet: { user: user} }
            ).exec();
            console.log('Property already exists, adding user to property');
            reponseProperty = updatedProperty;

            // add property to user
            const updatedUser = await this.userModel.findOneAndUpdate(
              { username: user },
              { $addToSet: { properties: property.title } }
            ).exec();
            console.log('Property already exists, adding property to user');
          }
        }
        else {
          // property does not exist
          // add property to property collection and user collection
          const updatedProperty = await createdProperty.save(); 
          const addUser = await this.propertiesModel.findOneAndUpdate(
            { 
              title: property.title,
              location: property.location,
              price: property.price,
              bedrooms: property.bedrooms,
              bathrooms: property.bathrooms,
              garages: property.garages,
              amenities: property.amenities,
              images: property.images,
              seen: property.seen
            },
            { $push: { user: user} }
            ).exec();

            console.log('Property does not exist, adding property to property collection and user to property');
          
          
          reponseProperty = addUser;

          const updatedUser = await this.userModel.findOneAndUpdate(
            { username: user },
            { $addToSet: {  properties: property.title  } }
          ).exec();
          console.log('Property does not exist, adding property to user collection');
        }

       // return createdProperty.save();
       return reponseProperty;
        
    }

    async getProperties(): Promise<PropertiesModel[] | null> {
        return this.propertiesModel.find().exec();
    }

    async getProperty(propertyId: string): Promise<PropertiesModel | null> {
        return this.propertiesModel.findById(propertyId).exec();
    }

    // get properties based on the preferences of the user
    async getPropertiesByPreferences(preference : IPropSearch): Promise<PropertiesModel[] | null> {
        const result = await this.propertiesModel.find({$and: [{price: {$lte: preference.budgetMax}}, {price: {$gte: preference.budgetMin}},
            // {bedrooms: {$gte: preference.bedrooms}}, 
            // {bathrooms: {$gte: preference.bathrooms}}, 
            // {garages: {$gte: preference.garages}},
            {location: {$eq: preference.location}},
            // {amenities: {$in: preference.amenities}}
            ]}).exec();

        console.log('getPropertiesByPreferences result: ', result);

        if(!result) {
            return null;
        }
            return result;
    }

    async removePropertyfromUser(title: string, username: string): Promise<UserModel | null> {
        //making property to be removed seen field to true
        const propSeen = await this.propertiesModel.findOneAndUpdate(
            { title: title },
            //making seen field to true
            { $set: { seen: true } }
          ).exec();

        const propRemove = await this.propertiesModel.findOneAndUpdate(
            { title: title },
            //pulling from user array
            { $pull: { user: username } }
          ).exec();

        console.log("propert to be removed: "+propRemove);

        const UserRemove = await this.userModel.findOneAndUpdate(
            { username: username },
            //pulling from properties array
            { $pull: { properties: title } }
          ).exec();
        
     //   console.log(UserRemove);

        if(!propRemove) {
            throw new Error('Property not found');  
        } 
        else if(!UserRemove) {  
            throw new Error('User not found');
        }
        else {
            return UserRemove;
        }
    }
}