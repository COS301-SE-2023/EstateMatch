import { ICreatePropertyRequest } from "../requests";

export class CreatePropertyCommand{
    constructor(public request: ICreatePropertyRequest){}
}
