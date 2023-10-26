import { Test, TestingModule } from '@nestjs/testing';
import { PropertiesService } from './properties.service';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
    ILikePropertyRequest,
    ILikePropertyResponse,
    LikePropertyCommand,
    IDislikePropertyRequest,
    IDislikePropertyResponse,
    DislikePropertyCommand,
    IGetLikedPropertiesRequest,
    IGetLikedPropertiesResponse,
    GetLikedPropertiesCommand
} from '@estate-match/api/properties/util';

describe('PropertiesService', () => {
  let service: PropertiesService;
  let commandBus: CommandBus;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PropertiesService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PropertiesService>(PropertiesService);
    commandBus = module.get<CommandBus>(CommandBus);
  });

  it('should set add the property to the database as liked', async () => {
    const request: ILikePropertyRequest = { 
        property: {
            user: 'test',
            title: 'TEst title',
            address: 'test',
            price: 1000,
            bedrooms: 1,
            bathrooms: 1,
            garages: 1,
            amenities: [],
            liked: true,
            image: 'test image',
            propertyURL: 'test url'
        }
    };

    const commandResponse: ILikePropertyResponse = { 
        message: 'property liked'
    };

    (commandBus.execute as jest.Mock).mockResolvedValue(commandResponse);
    const result = await service.likeProperty(request);
    expect(commandBus.execute).toHaveBeenCalledWith(
      expect.any(LikePropertyCommand),
    );
    expect(result).toEqual(commandResponse);
  });

  it('should set add the property to the database as disliked', async () => {
    const request: IDislikePropertyRequest = { 
        property: {
            user: 'test',
            title: 'TEst title',
            address: 'test',
            price: 1000,
            bedrooms: 1,
            bathrooms: 1,
            garages: 1,
            amenities: [],
            liked: false,
            image: 'test image',
            propertyURL: 'test url'
        }
    };

    const commandResponse: IDislikePropertyResponse = { 
        message: 'property disliked'
    };

    (commandBus.execute as jest.Mock).mockResolvedValue(commandResponse);
    const result = await service.dislikeProperty(request);
    expect(commandBus.execute).toHaveBeenCalledWith(
      expect.any(DislikePropertyCommand),
    );
    expect(result).toEqual(commandResponse);
  });

  it('get likedProperties from the database', async () => {
    const request: IGetLikedPropertiesRequest = { 
        user: 'test'
    };

    const commandResponse: IGetLikedPropertiesResponse = { 
        properties: [{
            user: 'test',
            title: 'TEst title',
            address: 'test',
            price: 1000,
            bedrooms: 1,
            bathrooms: 1,
            garages: 1,
            amenities: [],
            liked: true,
            image: 'test image',
            propertyURL: 'test url'
        },
        {
            user: 'test2',
            title: 'TEst title',
            address: 'test2',
            price: 1000,
            bedrooms: 1,
            bathrooms: 1,
            garages: 1,
            amenities: [],
            liked: true,
            image: 'test image',
            propertyURL: 'test url'
        },]
    };

    (commandBus.execute as jest.Mock).mockResolvedValue(commandResponse);
    const result = await service.getlikeProperty(request);
    expect(commandBus.execute).toHaveBeenCalledWith(
      expect.any(GetLikedPropertiesCommand),
    );
    expect(result).toEqual(commandResponse);
  });  
});






