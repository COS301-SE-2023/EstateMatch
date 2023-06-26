import { IProperty } from "../interfaces";
import { ISearchRequest  } from "@estate-match/api/search/util";
export interface IGetPropertyRequest{
    property: ISearchRequest;
    // preference: IPreference;
}