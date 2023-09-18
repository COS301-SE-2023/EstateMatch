import { IGetMapRequest } from "../requests/get-map.request";

export class GetMapCommand{
    constructor(public readonly request: IGetMapRequest) {}
}