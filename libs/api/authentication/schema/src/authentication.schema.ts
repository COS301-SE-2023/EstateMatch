import * as mongoose from 'mongoose';

export const AuthSchema = new mongoose.Schema({
    user : {type: String, required: true},
    password : {type: String, required: true},
});

export interface AuthModel  {
    user : string;
    password : string;
}