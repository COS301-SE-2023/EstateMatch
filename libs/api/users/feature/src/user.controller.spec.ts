import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CommandBus } from '@nestjs/cqrs';
import { IGetUserRequest, IGetUserResponse, ISetUserRequest, ISetUserResponse, IUpdateUserRequest, IUpdateUserResponse } from '@estate-match/api/users/util';

describe('UserController', () => {
  let app: TestingModule;
  let controller: UserController;
  let service: UserService;
  let commandBusMock: { execute: jest.Mock };

  beforeAll(async () => {
    commandBusMock = { execute: jest.fn() };
    app = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService,
        {
            provide: CommandBus,
            useValue: commandBusMock,
        }],
    }).compile();

    controller = app.get<UserController>(UserController);
    service = app.get<UserService>(UserService);
  });

  describe('getUser', () => {
    it('should return the user object for the specidied user', async () => {
      const request: IGetUserRequest = {
        user: 'test',
      };

      const expectedResult: IGetUserResponse = {
        user: {
            id: 'testID',
            firstName: 'Test FName',
            lastName: 'Test FName',
            email: 'test@gmail.com',
            username: 'testuser'
        },
      };

      jest.spyOn(service, 'getUser').mockResolvedValue(expectedResult);
      const result = await controller.getUser(request);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('setUser', () => {
    it('should call user service and create new user in the database', async () => {
      const request: ISetUserRequest = {
        user: {
            id: 'testID',
            firstName: 'Test FName',
            lastName: 'Test FName',
            email: 'test@gmail.com',
            username: 'testuser'
        }
      };

      const expectedResult: ISetUserResponse = {
        user: {
            id: 'testID',
            firstName: 'Test FName',
            lastName: 'Test FName',
            email: 'test@gmail.com',
            username: 'testuser'
        }
      };

      jest.spyOn(service, 'setUser').mockResolvedValue(expectedResult);
      const result = await controller.setUser(request);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('updateUser', () => {
    it('should call user service and update an existing user in the database', async () => {
      const user: IUpdateUserRequest = {
        username: 'test',
        newUserDetail: {
            id: 'testID',
            username: 'test2',
            firstName: 'testFName',
            lastName: 'testLName',
            email: 'test2@gmail.com',
        }
      };

      const expectedResult: IUpdateUserResponse = { 
        success: true
    };

      jest.spyOn(service, 'updateUser').mockResolvedValue(expectedResult);
      const result = await controller.updateUser(user);
      expect(result).toEqual(expectedResult);
    });
  });
});