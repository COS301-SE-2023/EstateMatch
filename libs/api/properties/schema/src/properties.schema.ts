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
    images: string[],
}