import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    // id : {type: String, required: true},
    username : {type: String, required: true},
    email : {type: String, required: true},
    firstName : {type: String, required: true},
    lastName : {type: String, required: true},
});

export interface UserModel  {
    // id : string;
    username : string;
    email : string;
    firstName : string;
    lastName : string;
}