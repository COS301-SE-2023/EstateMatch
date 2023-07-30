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
        const createdProperty = new this.propertiesModel(property);
        //check if the property already exists by address before saving
        const propertyExists = await this.propertiesModel.findOne({address: property.location}).exec();
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
    async getPropertiesByPreferences(preference : IPropSearch): Promise<PropertiesModel[] | null> {
        return this.propertiesModel.find({$and: [{price: {$lte: preference.budgetMax}}, {price: {$gte: preference.budgetMin}},
             {bedrooms: {$gte: preference.bedrooms}}, 
             {bathrooms: {$gte: preference.bathrooms}}, 
             {garages: {$gte: preference.garages}},
            {location: {$eq: preference.location}},
            {extras: {$in: preference.amenities}}
            ]}).exec();
    }
}