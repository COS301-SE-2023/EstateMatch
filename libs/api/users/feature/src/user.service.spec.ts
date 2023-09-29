import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { CommandBus } from '@nestjs/cqrs';
import { GetUserCommand, IGetUserRequest, IGetUserResponse, ISetUserRequest, ISetUserResponse, IUpdateUserRequest, IUpdateUserResponse, SetUserCommand, UpdateUserCommand } from '@estate-match/api/users/util';

describe('UserService', () => {
  let service: UserService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    commandBus = module.get<CommandBus>(CommandBus);
  });

  it('should return a user', async () => {
    const request: IGetUserRequest = { 
        user: 'TestUser'
    };

    const commandResponse: IGetUserResponse = { 
        user: {
            id: 'testID',
            firstName: 'Test FName',
            lastName: 'Test FName',
            email: 'test@gmail.com',
            username: 'testuser',
            languagePref: 'en',	
            properties: []
        }
    };

    (commandBus.execute as jest.Mock).mockResolvedValue(commandResponse);
    const result = await service.getUser(request);
    expect(commandBus.execute).toHaveBeenCalledWith(
      expect.any(GetUserCommand),
    );
    expect(result).toEqual(commandResponse);
  });

  it('should a user to the database', async () => {
    const request: ISetUserRequest = { 
        user: {
            id: 'testID',
            username: 'testU',
            firstName: 'testFName',
            lastName: 'testLName',
            email: 'test@gmail.com',
            languagePref: 'en',	
            properties: []
        }
    };

    const commandResponse: ISetUserResponse = { 
        user: {
            id: 'testID',
            username: 'testU',
            firstName: 'testFName',
            lastName: 'testLName',
            email: 'test@gmail.com',
            languagePref: 'en',	
            properties: []
        }
    };

    (commandBus.execute as jest.Mock).mockResolvedValue(commandResponse);
    const result = await service.setUser(request);
    expect(commandBus.execute).toHaveBeenCalledWith(
      expect.any(SetUserCommand),
    );
    expect(result).toEqual(commandResponse);
  });

  it('should update an existing user', async () => {
    const request: IUpdateUserRequest = { 
        username: 'test',
        newUserDetail: {
            id: 'testID',
            username: 'test2',
            firstName: 'testFName',
            lastName: 'testLName',
            email: 'test2@gmail.com',
            languagePref: 'en',	
            properties: []
        }
    };

    const commandResponse: IUpdateUserResponse = { 
        success: true
    };

    (commandBus.execute as jest.Mock).mockResolvedValue(commandResponse);
    const result = await service.updateUser(request);
    expect(commandBus.execute).toHaveBeenCalledWith(
      expect.any(UpdateUserCommand),
    );
    expect(result).toEqual(commandResponse);
  });  
});






