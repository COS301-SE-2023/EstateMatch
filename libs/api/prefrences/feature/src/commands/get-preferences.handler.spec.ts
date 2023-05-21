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
    // Create a mock command
    const mockCommand = new GetPreferencesCommand({
      user: 'mockUserId',
    });

    // Create a mock preferences object
    const mockPreferences = {
      // Define mock preferences properties
    };

    // Mock the findOne method of the PreferencesRepository
    jest.spyOn(mockRepository, 'findOne').mockResolvedValue(mockPreferences);

    // Execute the command handler
    const result = await handler.execute(mockCommand);

    // Assert that the findOne method was called with the correct user ID
    expect(mockRepository.findOne).toHaveBeenCalledWith('mockUserId');

    // Assert that the result matches the mock preferences object
    expect(result).toEqual(mockPreferences);
  });
});