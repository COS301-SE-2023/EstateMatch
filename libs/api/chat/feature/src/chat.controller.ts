import {Controller, Post, Body, Get} from '@nestjs/common';
import {ChatService} from './chat.service';
import { IGetChatRequest } from '@estate-match/api/chat/util';
import { ISetChatRequest} from '@estate-match/api/chat/util';
import { IUpdateChatRequest} from '@estate-match/api/chat/util';
@Controller()
export class ChatController {
    constructor(private readonly chatService: ChatService) {}
    
    @Post('/getChat')
    async getUser(@Body() request: IGetChatRequest) {
        return await this.chatService.getUser(request);
    }
    
    @Post('/setChat')
    async setUser(@Body() request: ISetChatRequest) {
        return await this.chatService.setUser(request);
    }

    @Post('/updateChat')
    async updateUser(@Body() request: IUpdateChatRequest) {
        return await this.chatService.updateUser(request);
    }
}