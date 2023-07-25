import * as mongoose from 'mongoose';

export const PropertiesSchema = new mongoose.Schema({
    //propertyId:  {type: String, required: true},
    title: {type: String, required: true},
    location: {type: String, required: true},
    price: Number,
    bedrooms: Number,
    bathrooms: Number,
    garages: Number,
    amenities: [String],


    //what Adam wants
    title : String,
   // HouseType : Rent/Sale

    images: [String],

});

export interface PropertiesModel {
    title: string,
    location: string,
    price: number,
    bedrooms: number,
    bathrooms: number,
    garages: number | null,
    amenities: string[],


    //what Adam wants
    title : string,
    // HouseType : Rent/Sale

    images: string[],

}