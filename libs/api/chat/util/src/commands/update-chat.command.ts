import { IUpdateChatRequest } from "../requests";

export class UpdateChatCommand {
    constructor(public request: IUpdateChatRequest) {}
}