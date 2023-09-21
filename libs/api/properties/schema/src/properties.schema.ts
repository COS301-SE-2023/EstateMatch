import * as mongoose from 'mongoose';
//import { IUser as user} from '@estate-match/api/users/util';

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
    // title : String,
   // HouseType : Rent/Sale

    images: [String],

    //used embedded documents to make the properties user specific (not what we want)
    // //making the properties user specific
    // userId: {type: String, required: true},
    // username: {type: String, required: true},
    // seen : {type: Boolean, required: true, default: false},
    // //userSchema : {type : user}

    //used references to make the properties user specific
    //hold array of user ids
    user : [{type: String, ref: 'User'}] ,//hold the id of the user
    seen : {type: Boolean, required: true, default: false},

    //ai-label 
    aiLabel : [{type: String, default: null}],
    rgbColour : [Number],
    description : String


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
    // title : string,
    // HouseType : Rent/Sale

    images: string[],

    // //making the properties user specific
    // userId: string,
    // username: string,
    // seen : boolean,

    //used references to make the properties user specific
    user : string[], //hold the username of the user
    seen : boolean,

    //ai-label
    aiLabel : string[],
    rgbColour : number[],
    description: string

}