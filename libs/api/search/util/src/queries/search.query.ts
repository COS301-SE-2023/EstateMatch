import { ISearchRequest } from "../requests"
export class SearchQuery {
    constructor(public readonly request: ISearchRequest) {}
}