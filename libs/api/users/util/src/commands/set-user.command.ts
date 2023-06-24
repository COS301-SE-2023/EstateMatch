import { ISetUserRequest } from "../requests";

export class SetUserCommand {  
    constructor(public request: ISetUserRequest) {}
}