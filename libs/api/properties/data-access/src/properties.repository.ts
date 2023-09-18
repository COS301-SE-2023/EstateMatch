import { PropertiesModel } from "@estate-match/api/properties/schema";
import { PrefrencesModel } from "@estate-match/api/prefrences/schema";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ISearch, ISearchRequest } from "@estate-match/api/search/util";
import { ICreatePropertyRequest, IPropSearch } from "@estate-match/api/properties/util";

@Injectable()
export class PropertiesRepository {
    constructor(@InjectModel('Properties') private readonly propertiesModel: Model<PropertiesModel>
    , @InjectModel('Prefrences') private readonly preferenceModel: Model<PrefrencesModel>
    ) {}

    async createProperty(request: ICreatePropertyRequest): Promise<PropertiesModel> {
        const property = request.property;
        const user = request.username;
        console.log(user)
        const createdProperty = new this.propertiesModel(property);
        let reponseProperty : any;
        const propertyExists = await this.propertiesModel.findOne({title: property.title}).exec();
        if(propertyExists) {
          const userExists = await this.propertiesModel.findOne({user: user}).exec();
          if(userExists) {
            throw new Error('Property already exists for this existing user');
          }
          else {
            console.log(property.title)
            // add user to existing property
            const updatedProperty = await this.propertiesModel.findOneAndUpdate(
              { title: property.title },
              { $addToSet: { user: user} }
            ).exec();
            reponseProperty = updatedProperty;

            const check = await this.propertiesModel.findOne({title: property.title}).exec();
            console.log(check);

            // add property to user
            const updatedUser = await this.preferenceModel.findOneAndUpdate(
              { username: user },
              { $addToSet: { properties: property.title } }
            ).exec();
          }
        }
        else {
          // property does not exist
          // add property to property collection and user collection
          const updatedProperty = await createdProperty.save(); 
          const addUser = await this.propertiesModel.findOneAndUpdate(
            { title: property.title },
            { $addToSet: { user: user} }
            ).exec();
            reponseProperty = addUser;
          const updatedUser = await this.preferenceModel.findOneAndUpdate(
            { username: user },
            { $addToSet: {  properties: property.title  } }
          ).exec();
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
}