import * as mongoose from 'mongoose';

export const LikedPropertiesSchema = new mongoose.Schema({
    user: String,
    address: {type: String, required: true},
    price: Number,
    bedrooms: Number,
    bathrooms: Number,
    garages: Number,
    amenities: [String],
    liked: Boolean
});
 
//our model 
export interface LikedProperties {
    user: string,
    address: string,
    price: number,
    bedrooms: number,
    bathrooms: number,
    garages: number,
    amenities: string[],
    liked: boolean

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