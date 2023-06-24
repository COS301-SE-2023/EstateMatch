import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './authentication.service';
import { CommandBus } from '@nestjs/cqrs';
import { ILoginRequest, ILoginResponse, IRegisterRequest, IRegisterResponse, LoginCommand, RegisterCommand } from '@estate-match/api/authentication/util';

describe('AuthService', () => {
  let service: AuthService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    commandBus = module.get<CommandBus>(CommandBus);
  });

  it('should login', async () => {
    const request: ILoginRequest = { 
        login: {
            username: 'test',
            password: 'test1234'
        }
    };

    const commandResponse: ILoginResponse = { 
        message: 'Login successful'
    };

    (commandBus.execute as jest.Mock).mockResolvedValue(commandResponse);
    const result = await service.login(request);
    expect(commandBus.execute).toHaveBeenCalledWith(
      expect.any(LoginCommand),
    );
    expect(result).toEqual(commandResponse);
  });


});