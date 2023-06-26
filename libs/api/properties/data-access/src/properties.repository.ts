import { PropertiesModel } from "@estate-match/api/properties/schema";
import { PrefrencesModel } from "@estate-match/api/prefrences/schema";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ISearchRequest } from "@estate-match/api/search/util";

@Injectable()
export class PropertiesRepository {
    constructor(@InjectModel('Properties') private readonly propertiesModel: Model<PropertiesModel>
    , @InjectModel('Prefrences') private readonly preferenceModel: Model<PrefrencesModel>
    ) {}

    async createProperty(property: PropertiesModel): Promise<PropertiesModel> {
        const createdProperty = new this.propertiesModel(property);
        //check if the property already exists by address before saving
        const propertyExists = await this.propertiesModel.findOne({address: property.address}).exec();
        if(propertyExists) {
            throw new Error('Property already exists');
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
    async getPropertiesByPreferences(preference : ISearchRequest): Promise<PropertiesModel[] | null> {
        const userPreference = preference.filters;
        return this.propertiesModel.find({$and: [{price: {$lte: userPreference.maxBudget}}, {price: {$gte: userPreference.minBudget}},
            //  {bedrooms: {$gte: userPreference.bedrooms}}, 
            //  {bathrooms: {$gte: userPreference.bathrooms}}, 
            //  {garages: {$gte: userPreference.garages}},
             {location: {$eq: userPreference.location}},
            // {extras: {$in: userPreference.extras}}
            ]}).exec();
    }
}