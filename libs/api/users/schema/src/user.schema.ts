import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    // id : {type: String, required: true},
    username : {type: String, required: true},
    email : {type: String, required: true},
    firstName : {type: String, required: true},
    lastName : {type: String, required: true},

    //using references to make the properties user specific
    properties: [{type: mongoose.Schema.Types.ObjectId, ref: 'Properties'}]
});

export interface UserModel  {
    // id : string;
    username : string;
    email : string;
    firstName : string;
    lastName : string;

    //using references to make the properties user specific
    properties: string[]; //hold the ids of the properties
}