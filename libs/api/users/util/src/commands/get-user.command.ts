import { IGetUserRequest } from "../requests";

export class GetUserCommand {
    constructor(public request: IGetUserRequest) {}
}