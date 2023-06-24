import { IPreference } from "@estate-match/api/prefrences/util";

export interface ICreatePropertyRequest {
    preference: IPreference; //create property based on preference
}