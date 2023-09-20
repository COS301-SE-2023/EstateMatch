import * as mongoose from 'mongoose';

export const PrefrencesSchema = new mongoose.Schema({
    user : {type: String, required: true},
    budgetMin : Number,
    budgetMax : Number,
    location : [String],
    bedrooms : Number,
    bathrooms : Number,
    garages : Number,
    extras : [String],
});

//our model
export interface PrefrencesModel  {
    user : string;
    budgetMin : number;
    budgetMax : number;
    location : string[];
    bedrooms : number;
    bathrooms : number;
    garages : number;
    extras : string[],
}

// import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
// import {Document} from 'mongoose';
// export type PrefrencesDocument = Prefrences & Document;


// export class Prefrences {
//     constructor(
//         public user : string,
//         public budget : number,
//         public location : string,
//         public bedrooms : number,
//         public bathrooms : number,
//         public garages : number,
//         //public extra : string,
//     ){}


// }
//export const PrefrencesSchema = SchemaFactory.createForClass(Prefrences);