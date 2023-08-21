import { Test, TestingModule } from '@nestjs/testing';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { CommandBus } from '@nestjs/cqrs';
import { IGetChatRequest, IGetChatResponse, ISetChatRequest, ISetChatResponse, IUpdateChatRequest, IUpdateChatResponse } from '@estate-match/api/chat/util';

describe('UserController', () => {
  
});