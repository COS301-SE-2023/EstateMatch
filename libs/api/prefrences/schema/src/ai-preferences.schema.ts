import * as mongoose from 'mongoose';

export const AIPrefrencesSchema = new mongoose.Schema({
    user: String,
    colourDataPoints: [String],
    colour: String,
});

//our model
export interface AIPrefrencesModel  {
    user : string;
    colourDataPoints: string[];
    colour : string;
}