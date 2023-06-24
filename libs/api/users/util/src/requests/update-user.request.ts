import { IUser } from "../interfaces";

export interface IUpdateUserRequest {
    username: string;
    newUserDetail: IUser;
}