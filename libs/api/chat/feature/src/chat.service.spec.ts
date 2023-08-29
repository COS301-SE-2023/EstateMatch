import { Test, TestingModule } from '@nestjs/testing';
import { ChatService } from './chat.service';
import { CommandBus } from '@nestjs/cqrs';
import { GetChatCommand, IGetChatRequest, IGetChatResponse, ISetChatRequest, ISetChatResponse, IUpdateChatRequest, IUpdateChatResponse, SetChatCommand, UpdateChatCommand } from '@estate-match/api/chat/util';

describe('ChatService', () => {
    let service: ChatService;
    let commandBus: CommandBus;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ChatService,
                {
                    provide: CommandBus,
                    useValue: {
                        execute: jest.fn(),
                    },
                },
            ],
        }).compile();

        service = module.get<ChatService>(ChatService);
        commandBus = module.get<CommandBus>(CommandBus);
    });


    it('should return a chat', async () => {
        const request: IGetChatRequest = { 
            chat: {
                username: 'testuser'
            }
        };

        const commandResponse: IGetChatResponse = { 
            chat: {
                id: 'testID',
                username: 'testuser',
                message: 'test message'
            }
        };

        (commandBus.execute as jest.Mock).mockResolvedValue(commandResponse);
        const result = await service.getChat(request);
        expect(commandBus.execute).toHaveBeenCalledWith(
            expect.any(GetChatCommand),
        );
        expect(result).toEqual(commandResponse);
    });
});






