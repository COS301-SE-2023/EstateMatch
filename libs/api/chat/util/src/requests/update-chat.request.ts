import { IChat } from "../interfaces";

export interface IUpdateUserRequest {
    username: string;
    message: IChat;
}