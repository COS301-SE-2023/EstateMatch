import { IProperty } from "@estate-match/api/properties/util";
import { IAIPreference } from "@estate-match/api/prefrences/util";

export interface IMatchRequest {
    property: IProperty;
    preferences: IAIPreference;
}