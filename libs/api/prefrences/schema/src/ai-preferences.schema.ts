import * as mongoose from 'mongoose';

export const AIPrefrencesSchema = new mongoose.Schema({
    user: String,
    colour: String,
});

//our model
export interface AIPrefrencesModel  {
    user : string;
    colour : string;
}