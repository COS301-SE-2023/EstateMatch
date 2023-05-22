import * as mongoose from 'mongoose';

export const PrefrencesSchema = new mongoose.Schema({
    user : {type: String, required: true},
    budget : Number,
    location : String,
    bedrooms : Number,
    bathrooms : Number,
    garages : Number,
    //extra : {type : String, default : "None"},
});

//our model
export interface PrefrencesModel  {
    user : string;
    budget : number;
    location : string;
    bedrooms : number;
    bathrooms : number;
    garages : number;
    //extra : string,
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