import * as mongoose from 'mongoose';

export const LikedPropertiesSchema = new mongoose.Schema({
    user: String,
    title : {type: String, required: true, unique: true},
    address: {type: String, required: true},
    price: Number,
    bedrooms: Number,
    bathrooms: Number,
    garages: Number || null,
    amenities: [String],
    liked: Boolean,
    image: String,
    propertyURL : {type: String, default: null},

});
 
//our model 
export interface LikedPropertiesModel {
    user: string,
    title : string,
    address: string,
    price: number,
    bedrooms: number,
    bathrooms: number,
    garages: number | null,
    amenities: string[],
    liked: boolean,
    image: string,
    propertyURL: string,
}














// {
//     address: string,
//     price: number,
//     bedrooms: number,
//     bathrooms: number,
//     garages: number,
//     amenities: string[],
//     liked: boolean
// }