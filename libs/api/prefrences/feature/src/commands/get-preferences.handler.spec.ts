import { PreferencesRepository } from '@estate-match/api/prefrences/data-access';
import { GetPreferencesCommand, IGetPreferencesResponse, IPreference } from '@estate-match/api/prefrences/util';
import { GetPreferencesHandler } from './get-preferences.handler';
import { EventPublisher } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Connection, connect, Model } from 'mongoose';
import { PrefrencesSchema, PrefrencesModel } from '@estate-match/api/prefrences/schema';
import { getModelToken } from '@nestjs/mongoose';

describe('GetPreferencesHandler', () => {
    let handler: GetPreferencesHandler;
    let mongodb: MongoMemoryServer;
    let connection: Connection;
    let preferencesModel: Model<PrefrencesModel>;

    let mockRepository: any;
    beforeAll(async () => {
      mongodb = await MongoMemoryServer.create();
      const uri = mongodb.getUri();
      connection = (await connect(uri)).connection;
      preferencesModel = connection.model<PrefrencesModel>('Prefrences', PrefrencesSchema);
      mockRepository = {
        findOne: jest.fn(),
      };
      const moduleRef = await Test.createTestingModule({
        providers: [
            GetPreferencesHandler,
          {
            provide: EventPublisher,
            useValue: {
              mergeObjectContext: jest.fn(),
            },
          },
          { provide: PreferencesRepository, useValue: mockRepository },
          {provide: getModelToken(preferencesModel.name), useValue: preferencesModel},
        ],
      }).compile();
  
      handler = moduleRef.get<GetPreferencesHandler>(GetPreferencesHandler);
    });

    afterAll(async () => {
      await connection.dropDatabase();
      await connection.close();
      await mongodb.stop();
    });

  it('should return the result of findOne method from PreferencesRepository', async () => {
    const mockCommand = new GetPreferencesCommand({
      user: 'mockUserId',
    });

    const mockPreferences = {
      preferences: {
        user: 'test',
        location: 'test',
        budget: 1000,
        bedrooms: 1,
        bathrooms: 1,
        garages: 1,
        extras: []
    }
    };

    jest.spyOn(mockRepository, 'findOne').mockResolvedValue(mockPreferences);
    const result = await handler.execute(mockCommand);
    expect(mockRepository.findOne).toHaveBeenCalledWith('mockUserId');
    expect(result).toEqual(mockPreferences);
  });
});