import * as mongoose from 'mongoose';

export const AIPrefrencesSchema = new mongoose.Schema({
    user: String,
    labelDataPoints: [String],
    labels: String,
});

//our model
export interface AIPrefrencesModel  {
    user : string;
    labelDataPoints: string[];
    labels : String;
}