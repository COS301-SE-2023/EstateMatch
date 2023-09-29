import { IGetMapRequest } from "../requests";

export class GetMapCommand{
    constructor(public readonly request: IGetMapRequest) {}
}