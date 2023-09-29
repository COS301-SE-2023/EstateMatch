import { Test, TestingModule } from '@nestjs/testing';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { CommandBus } from '@nestjs/cqrs';
import { ISetChatRequest, ISetChatResponse } from '@estate-match/api/chat/util';

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
        it('should call chat service and create new chat in the database', async () => {
            const request: ISetChatRequest = {
                chat: {
                    username: 'testuser',
                    message: 'test message'
                }
            };
        
            const expectedResult: ISetChatResponse = {
                chat: {
                    username: 'testuser',
                    message: 'test message'
                }
            };
            jest.spyOn(service, 'setChat').mockResolvedValue(expectedResult);
            const result = await controller.setChat(request);
            expect(result).toEqual(expectedResult);
        });
    });
});