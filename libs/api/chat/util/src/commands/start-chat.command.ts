import { IStartChatRequest } from "../requests";

export class StartChatCommand {
    constructor(public request: IStartChatRequest) {}
}