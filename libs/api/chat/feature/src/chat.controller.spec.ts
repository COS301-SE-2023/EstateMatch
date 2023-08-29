import { Test, TestingModule } from '@nestjs/testing';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { CommandBus } from '@nestjs/cqrs';
import { IGetChatRequest, IGetChatResponse, ISetChatRequest, ISetChatResponse, IUpdateChatRequest, IUpdateChatResponse } from '@estate-match/api/chat/util';

describe('ChatController', () => {
    let app: TestingModule;
    let controller: ChatController;
    let service: ChatService;
    let commandBusMock: { execute: jest.Mock };

    beforeAll(async () => {
        commandBusMock = { execute: jest.fn() };
        app = await Test.createTestingModule({
            controllers: [ChatController],
            providers: [ChatService,
                {
                    provide: CommandBus,
                    useValue: commandBusMock,
                }],
        }).compile();

        controller = app.get<ChatController>(ChatController);
        service = app.get<ChatService>(ChatService);
    });


    describe('setChat', () => {
        const request: ISetChatRequest = {
            chat: {
                id: 'testID',
                username: 'testuser',
                message: 'test message'
            }
        };
    
        const expectedResult: IGetChatResponse = {
            chat: {
                id: 'testID',
                username: 'testuser',
                message: 'test message'
            }
        };
        
    });
    
    describe('getChat', () => {
        const request: IGetChatRequest = {
            chat: {
                username: 'testuser'
            }
        };
    
        const expectedResult: IGetChatResponse = {
            chat: {
                id: 'testID',
                username: 'testuser',
                message: 'test message'
            }
        };
    })
    
    describe('updateChat', () => {
    
        const request: IUpdateChatRequest = {
            username: 'testuser',
            chat: {
                id: 'testID',
                username: 'testuser',
                message: 'test message'
            }
        };
    
        const expectedResult: IUpdateChatResponse = {
            success: true
        };
    })
    });
});