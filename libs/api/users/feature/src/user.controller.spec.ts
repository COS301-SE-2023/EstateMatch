import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CommandBus } from '@nestjs/cqrs';
import { IGetUserRequest, IGetUserResponse, ISetUserRequest, ISetUserResponse } from '@estate-match/api/users/util';

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

//   describe('getLikedProperties', () => {
//     it('should call return the liked properties of the user', async () => {
//       const user: IGetLikedPropertiesRequest = {
//         user: 'test',
//       };

//       const expectedResult: IGetLikedPropertiesResponse = {
//         properties: [{
//           user: 'test',
//           address: 'test',
//           price: 1000,
//           bedrooms: 1,
//           bathrooms: 1,
//           garages: 1,
//           amenities: [],
//           liked: true,
//           image: 'test image'
//         },]
//       };

//       jest.spyOn(service, 'getlikeProperty').mockResolvedValue(expectedResult);

//       const result = await controller.getLikedProperties(user);
//       expect(result).toEqual(expectedResult);

//     });
//   });
});