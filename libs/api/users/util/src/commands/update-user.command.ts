import { IUpdateUserRequest } from "../requests";

export class UpdateUserCommand {
    constructor(public request: IUpdateUserRequest) {}
}