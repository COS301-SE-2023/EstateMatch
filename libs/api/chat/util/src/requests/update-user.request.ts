import { IChat } from "../interfaces";

export interface IUpdateUserRequest {
    username: string;
    newUserDetail: IUser;
    message: IMessage;
}