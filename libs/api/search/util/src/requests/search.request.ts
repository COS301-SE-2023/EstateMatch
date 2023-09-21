import { ISearch } from "../interfaces";

export interface ISearchRequest {
    username: string;
    filters: ISearch;
}