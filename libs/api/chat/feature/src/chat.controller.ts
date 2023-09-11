import {Controller, Post, Body} from '@nestjs/common';
import {ChatService} from './chat.service';
import { IStartChatRequest } from '@estate-match/api/chat/util';
import { ISetChatRequest} from '@estate-match/api/chat/util';
import { IUpdateChatRequest} from '@estate-match/api/chat/util';
@Controller()
export class ChatController {
    constructor(private readonly chatService: ChatService) {}
    
    @Post('/startChat')
    async startChat(@Body() request: IStartChatRequest) {
        return await this.chatService.startChat(request);
    }
    
    @Post('/setChat')
    async setChat(@Body() request: ISetChatRequest) {
        return await this.chatService.setChat(request);
    }

    @Post('/updateChat')
    async updateChat(@Body() request: IUpdateChatRequest) {
        return await this.chatService.updateChat(request);
    }
}