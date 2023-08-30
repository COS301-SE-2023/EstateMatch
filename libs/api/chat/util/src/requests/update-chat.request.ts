import { IChat } from "../interfaces";

export interface IUpdateChatRequest {
    username: string;
    chat: IChat;
}