import * as mongoose from 'mongoose';

export const LikedPropertySchema = new mongoose.Schema({
    address: {type: String, required: true},
    price: Number,
    bedrooms: Number,
    bathrooms: Number,
    garages: Number,
    amenities: [String],
    liked: Boolean
});
 
//our model 
export interface LikedPropertyModel {
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