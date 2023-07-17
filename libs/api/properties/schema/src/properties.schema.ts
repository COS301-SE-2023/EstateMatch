import * as mongoose from 'mongoose';

export const PropertiesSchema = new mongoose.Schema({
    //propertyId:  {type: String, required: true},
    address: {type: String, required: true},
    price: Number,
    bedrooms: Number,
    bathrooms: Number,
    garages: Number,
    amenities: [String],

    //what Adam wants
    title : String,
   // HouseType : Rent/Sale
});

export interface PropertiesModel {
    //propertyId: string,
    address: string,
    price: number,
    bedrooms: number,
    bathrooms: number,
    garages: number,
    amenities: string[],

    //what Adam wants
    title : string,
    // HouseType : Rent/Sale
}