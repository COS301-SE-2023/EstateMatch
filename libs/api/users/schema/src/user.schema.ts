import * as mongoose from 'mongoose';
import { PropertiesModel , PropertiesSchema} from '@estate-match/api/properties/schema';

//getting the title of the property
const Property = mongoose.model('Property', PropertiesSchema);
const property = new Property();
const propertyTitle = property.title;

export const UserSchema = new mongoose.Schema({
    // id : {type: String, required: true},
    username : {type: String, required: true},
    email : {type: String, required: true},
    firstName : {type: String, required: true},
    lastName : {type: String, required: true},

    //using references to make the properties user specific by holding multiple titles of the properties
    
    //properties: [{type: propertyTitle, ref: 'Properties'}] //hold the titles of the properties
    properties: [{type: String, ref: 'Properties'}] //hold the titles of the properties
    // properties: [{type: mongoose.Schema.Types.ObjectId, ref: 'Properties'}] //hold the titles of the properties

});

export interface UserModel  {
    // id : string;
    username : string;
    email : string;
    firstName : string;
    lastName : string;

    //using references to make the properties user specific
    properties: string[]; //hold the titles of the properties
}