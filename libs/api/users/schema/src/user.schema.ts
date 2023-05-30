import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    userID : {type: String, required: true},
    name : {type: String, required: true},
    email : {type: String, required: true},
    password : {type: String, required: true},
    phone : {type: String, required: true},
});

export interface UserModel  {
    userID : string;
    name : string;
    email : string;
    password : string;
    phone : string;
}