import {IChat} from '../interfaces/chat.interface';

export interface ISetChatRequest {
    user: IUser;
    message: IMessage;
}