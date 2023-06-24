import {Injectable} from '@nestjs/common';
import { GetUserCommand, IGetUserRequest, IGetUserResponse } from '@estate-match/api/users/util';
import { SetUserCommand, ISetUserRequest, ISetUserResponse } from '@estate-match/api/users/util';
import { UpdateUserCommand, IUpdateUserRequest, IUpdateUserResponse } from '@estate-match/api/users/util';
import { CommandBus } from '@nestjs/cqrs';

@Injectable()
export class UserService {
    constructor(private readonly commandBus: CommandBus) {}
    
    async getUser(request: IGetUserRequest): Promise<IGetUserResponse> {
        return await this.commandBus.execute<
            GetUserCommand, IGetUserResponse>(new GetUserCommand(request));
    }
    
    async setUser(request: ISetUserRequest): Promise<ISetUserResponse> {
       return await this.commandBus.execute<
            SetUserCommand, ISetUserResponse>(new SetUserCommand(request));
    }

    async updateUser(request: IUpdateUserRequest): Promise<IUpdateUserResponse> {
        return await this.commandBus.execute<
            UpdateUserCommand, IUpdateUserResponse>(new UpdateUserCommand(request));
    }
}