import * as mongoose from 'mongoose';

export const AIPrefrencesSchema = new mongoose.Schema({
    colour: String,
});

//our model
export interface AIPrefrencesModel  {
    colour : string;
}