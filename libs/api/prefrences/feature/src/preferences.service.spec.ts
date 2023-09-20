import { Test, TestingModule } from '@nestjs/testing';
import { PreferenceService } from './preferences.service';
import { CommandBus } from '@nestjs/cqrs';
import {
  IGetPreferencesRequest,
  IGetPreferencesResponse,
  GetPreferencesCommand,
  ISetPreferencesRequest,
  ISetPreferencesResponse,
  SetPreferencesCommand,
} from '@estate-match/api/prefrences/util';

describe('PreferenceService', () => {
  let service: PreferenceService;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PreferenceService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PreferenceService>(PreferenceService);
    commandBus = module.get<CommandBus>(CommandBus);
  });

  it('should get preferences', async () => {
    const request: IGetPreferencesRequest = { user: 'test' };
    const commandResponse: IGetPreferencesResponse = { 
        preferences: {
            user: 'test',
            location: [],
            budgetMin: 1000,
            budgetMax: 10000,
            bedrooms: 1,
            bathrooms: 1,
            garages: 1,
            extras: []
        }
    };

    (commandBus.execute as jest.Mock).mockResolvedValue(commandResponse);
    const result = await service.getPreferences(request);
    expect(commandBus.execute).toHaveBeenCalledWith(
      expect.any(GetPreferencesCommand),
    );
    expect(result).toEqual(commandResponse);
  });

  it('should set preferences', async () => {
    const request: ISetPreferencesRequest = { 
        preferences: {
            user: 'test',
            location: [],
            budgetMin: 1000,
            budgetMax: 10000,
            bedrooms: 1,
            bathrooms: 1,
            garages: 1,
            extras: []
        }
     };
    const commandResponse: ISetPreferencesResponse = { 
        preferences: {
            user: 'test',
            location: [],
            budgetMin: 1000,
            budgetMax: 10000,
            bedrooms: 1,
            bathrooms: 1,
            garages: 1,
            extras: []
        }
     };

    (commandBus.execute as jest.Mock).mockResolvedValue(commandResponse);
    const result = await service.setPreferences(request);
    expect(commandBus.execute).toHaveBeenCalledWith(
      expect.any(SetPreferencesCommand),
    );
    expect(result).toEqual(commandResponse);
  });
});






