import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { CommandBus } from '@nestjs/cqrs';
import { GetUserCommand, IGetUserRequest, IGetUserResponse } from '@estate-match/api/users/util';

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
            username: 'testuser'
        }
    };

    (commandBus.execute as jest.Mock).mockResolvedValue(commandResponse);
    const result = await service.getUser(request);
    expect(commandBus.execute).toHaveBeenCalledWith(
      expect.any(GetUserCommand),
    );
    expect(result).toEqual(commandResponse);
  });

//   it('should set add the property to the database as disliked', async () => {
//     const request: IDislikePropertyRequest = { 
//         property: {
//             user: 'test',
//             address: 'test',
//             price: 1000,
//             bedrooms: 1,
//             bathrooms: 1,
//             garages: 1,
//             amenities: [],
//             liked: false,
//             image: 'test image'
//         }
//     };

//     const commandResponse: IDislikePropertyResponse = { 
//         message: 'property disliked'
//     };

//     (commandBus.execute as jest.Mock).mockResolvedValue(commandResponse);
//     const result = await service.dislikeProperty(request);
//     expect(commandBus.execute).toHaveBeenCalledWith(
//       expect.any(DislikePropertyCommand),
//     );
//     expect(result).toEqual(commandResponse);
//   });

//   it('get likedProperties from the database', async () => {
//     const request: IGetLikedPropertiesRequest = { 
//         user: 'test'
//     };

//     const commandResponse: IGetLikedPropertiesResponse = { 
//         properties: [{
//             user: 'test',
//             address: 'test',
//             price: 1000,
//             bedrooms: 1,
//             bathrooms: 1,
//             garages: 1,
//             amenities: [],
//             liked: true,
//             image: 'test image'
//         },
//         {
//             user: 'test2',
//             address: 'test2',
//             price: 1000,
//             bedrooms: 1,
//             bathrooms: 1,
//             garages: 1,
//             amenities: [],
//             liked: true,
//             image: 'test image'
//         },]
//     };

//     (commandBus.execute as jest.Mock).mockResolvedValue(commandResponse);
//     const result = await service.getlikeProperty(request);
//     expect(commandBus.execute).toHaveBeenCalledWith(
//       expect.any(GetLikedPropertiesCommand),
//     );
//     expect(result).toEqual(commandResponse);
//   });  
});






