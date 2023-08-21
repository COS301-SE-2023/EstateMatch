import {Injectable} from '@nestjs/common';
import { GetChatCommand, IGetChatRequest, IGetChatResponse } from '@estate-match/api/chat/util';
import { SetChatCommand, ISetChatRequest, ISetChatResponse } from '@estate-match/api/chat/util';
import { UpdateChatCommand, IUpdateChatRequest, IUpdateChatResponse } from '@estate-match/api/chat/util';
import { CommandBus } from '@nestjs/cqrs';

@Injectable()
export class UserService {
    constructor(private readonly commandBus: CommandBus) {}
    
    async getChat(request: IGetChatRequest): Promise<IGetChatResponse> {
        return await this.commandBus.execute<
            GetChatCommand, IGetChatResponse>(new GetChatCommand(request));
    }
    
    async setChat(request: ISetChatRequest): Promise<ISetChatResponse> {
       return await this.commandBus.execute<
            SetChatCommand, ISetChatRequest>(new SetChatCommand(request));
    }

    async updateChat(request: IUpdateChatRequest): Promise<IUpdateChatResponse> {
        return await this.commandBus.execute<
            UpdateChatCommand, IUpdateChatResponse>(new UpdateChatCommand(request));
    }
}