import {Injectable} from '@nestjs/common';
import { StartChatCommand, IStartChatRequest, IStartChatResponse } from '@estate-match/api/chat/util';
import { SetChatCommand, ISetChatRequest, ISetChatResponse } from '@estate-match/api/chat/util';
import { UpdateChatCommand, IUpdateChatRequest, IUpdateChatResponse } from '@estate-match/api/chat/util';
import { CommandBus } from '@nestjs/cqrs';

@Injectable()
export class ChatService {
    constructor(private readonly commandBus: CommandBus) {}
    
    async startChat(request: IStartChatRequest): Promise<IStartChatResponse> {
        return await this.commandBus.execute<
            StartChatCommand, IStartChatResponse>(new StartChatCommand(request));
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