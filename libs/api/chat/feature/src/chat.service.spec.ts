import { Test, TestingModule } from '@nestjs/testing';
import { ChatService } from './chat.service';
import { CommandBus } from '@nestjs/cqrs';
import { ISetChatRequest, ISetChatResponse,  SetChatCommand } from '@estate-match/api/chat/util';

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


    it('should return a chat message', async () => {
        const request: ISetChatRequest = { 
            chat: {
                username: 'testuser',
                message: 'test message'
            }
        };

        const commandResponse: ISetChatResponse = { 
            chat: {
                username: 'testuser',
                message: 'test message'
            }
        };

        (commandBus.execute as jest.Mock).mockResolvedValue(commandResponse);
        const result = await service.setChat(request);
        expect(commandBus.execute).toHaveBeenCalledWith(
            expect.any(SetChatCommand),
        );
        expect(result).toEqual(commandResponse);
    });
});






