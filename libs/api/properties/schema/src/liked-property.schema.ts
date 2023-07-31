import * as mongoose from 'mongoose';

export const LikedPropertiesSchema = new mongoose.Schema({
    user: String,
    address: {type: String, required: true},
    price: Number,
    bedrooms: Number,
    bathrooms: Number,
    garages: Number || null,
    amenities: [String],
    liked: Boolean,
    image: String
});
 
//our model 
export interface LikedPropertiesModel {
    user: string,
    address: string,
    price: number,
    bedrooms: number,
    bathrooms: number,
    garages: number | null,
    amenities: string[],
    liked: boolean,
    image: string
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