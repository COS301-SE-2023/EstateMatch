import { PropertiesModel } from "@estate-match/api/properties/schema";
import { PrefrencesModel } from "@estate-match/api/prefrences/schema";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class PropertiesRepository {
    constructor(@InjectModel('Properties') private readonly propertiesModel: Model<PropertiesModel>
    , @InjectModel('Prefrences') private readonly preferenceModel: Model<PrefrencesModel>
    ) {}

    async createProperty(property: PropertiesModel): Promise<PropertiesModel> {
        const createdProperty = new this.propertiesModel(property);
        return createdProperty.save();
    }

    async getProperties(): Promise<PropertiesModel[] | null> {
        return this.propertiesModel.find().exec();
    }

    async getProperty(propertyId: string): Promise<PropertiesModel | null> {
        return this.propertiesModel.findById(propertyId).exec();
    }

    //get properties based on the preferences of the user
    async getPropertiesByPreferences(preference : PrefrencesModel): Promise<PropertiesModel[] | null> {
        const userPreference = new this.preferenceModel(preference);
        return this.propertiesModel.find({$and: [{price: {$lte: userPreference.budget}},
             {bedrooms: {$gte: userPreference.bedrooms}}, 
             {bathrooms: {$gte: userPreference.bathrooms}}, 
             {garages: {$gte: userPreference.garages}},
             {location: {$eq: userPreference.location}},
            {extras: {$in: userPreference.extras}}
            ]}).exec();
    }
    

}