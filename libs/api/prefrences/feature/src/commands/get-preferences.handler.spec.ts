import { PreferencesRepository } from '@estate-match/api/prefrences/data-access';
import { GetPreferencesCommand, IGetPreferencesResponse } from '@estate-match/api/prefrences/util';
import { GetPreferencesHandler } from './get-preferences.handler';
import { EventPublisher } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

describe('GetPreferencesHandler', () => {
    let handler: GetPreferencesHandler;
    let mockRepository: any;
    beforeEach(async () => {
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
        ],
      }).compile();
  
      handler = moduleRef.get<GetPreferencesHandler>(GetPreferencesHandler);
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