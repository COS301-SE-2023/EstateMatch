import { PropertiesModel } from "@estate-match/api/properties/schema";
import { PrefrencesModel } from "@estate-match/api/prefrences/schema";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ISearch, ISearchRequest } from "@estate-match/api/search/util";
import { IPropSearch } from "@estate-match/api/properties/util";

@Injectable()
export class PropertiesRepository {
    constructor(@InjectModel('Properties') private readonly propertiesModel: Model<PropertiesModel>
    , @InjectModel('Prefrences') private readonly preferenceModel: Model<PrefrencesModel>
    ) {}

    async createProperty(property: PropertiesModel): Promise<PropertiesModel> {
        // const createdProperty = new this.propertiesModel(property);
        // //check if the property already exists by address before saving
        // const propertyExists = await this.propertiesModel.findOne({address: property.location}).exec();
        // if(propertyExists) {
        //     throw new Error('Property already exists'); //change this to check if the property is already in the users list of properties
        //     //else if the property is not in the users list of properties, add it to the list
        //     //else if property exist but need to add user 
        // }

        // return createdProperty.save();

        //New Property
        const createdProperty = new this.propertiesModel(property);
        //check if the property already exists by address before saving
        const propertyExists = await this.propertiesModel.findOne({title: property.title}).exec(); 
        if(propertyExists) {
            //property exist for new user
            //check if user exist
            const userExists = await this.propertiesModel.findOne({user: property.user}).exec();
            if(userExists) {
                //do nothing for existing user and property
                throw new Error('Property already exists for this existing user');
            }
            else {
                //add user to existing property
                const updatedProperty = await this.propertiesModel.findOneAndUpdate(
                    {title: property.title},
                    {$addToSet: {user: property.user} }
                    ).exec();

                if (updatedProperty) {
                //add property to user
                const updatedUser = await this.preferenceModel.findOneAndUpdate(
                    {username: property.user}, 
                    {$addToSet: {properties: updatedProperty.title}}
                    ).exec();
                
                    if (updatedUser) {
                        updatedUser.save();
                    } else {
                        console.log('User not found');
                    }
                } else {
                console.log('Property not found');
                }
            }
            
        }
        else {
            //property does not exist
            //add property to property collection and user collection
            const updatedProperty = await createdProperty.save();
            const updatedUser = await this.preferenceModel.findOneAndUpdate(
                {username: property.user},
                {$addToSet: {properties: updatedProperty.title}}
                ).exec();
            if (updatedProperty) {
                //add property to user
                const updatedUser = await this.preferenceModel.findOneAndUpdate(
                    {username: property.user},
                    {$addToSet: {properties: updatedProperty.title}}
                    ).exec();
                    
                    if (updatedUser) {
                        updatedUser.save();
                    } else {
                        console.log('User not found');
                    }
                } else {
                console.log('Property not found');
                }
            
        }
        return createdProperty.save();
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
}