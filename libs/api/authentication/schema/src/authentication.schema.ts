import * as mongoose from 'mongoose';

export const AuthenticationSchema = new mongoose.Schema({
    username : {type: String, required: true},
    password : {type: String, required: true},
});

export interface AuthenticationModel  {
    username : string;
    password : string;
}