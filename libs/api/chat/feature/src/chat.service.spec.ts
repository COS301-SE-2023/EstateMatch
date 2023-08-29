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

    it('should a chat to the database', async () => {
        const request: ISetChatRequest = { 
            chat: {
                id: 'testID',
                username: 'testuser',
                message: 'test message'
            }
        };

        const commandResponse: ISetChatResponse = { 
            chat: {
                id: 'testID',
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

    it('should update a chat in the database', async () => {
        const request: IUpdateChatRequest = { 
            chat: {
                id: 'testID',
                username: 'testuser',
                message: 'test message'
            }
        };

        const commandResponse: IUpdateChatResponse = { 
            chat: {
                id: 'testID',
                username: 'testuser',
                message: 'test message'
            }
        };

        (commandBus.execute as jest.Mock).mockResolvedValue(commandResponse);
        const result = await service.updateChat(request);
        expect(commandBus.execute).toHaveBeenCalledWith(
            expect.any(UpdateChatCommand),
        );
        expect(result).toEqual(commandResponse);
    });
});






