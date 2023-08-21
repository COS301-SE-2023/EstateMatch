import { IChat } from "../interfaces";

export interface IUpdateChatRequest {
    username: string;
    message: IChat;
}