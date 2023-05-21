import { Test, TestingModule } from '@nestjs/testing';

import { PreferenceController } from './preferences.controller';
import { PreferenceService } from './preferences.service';
import { IGetPreferencesRequest, IGetPreferencesResponse } from '@estate-match/api/prefrences/util';
import { CommandBus } from '@nestjs/cqrs';

describe('AppController', () => {
  let app: TestingModule;
  let controller: PreferenceController;
  let service: PreferenceService;
  let commandBusMock: { execute: jest.Mock };

  beforeAll(async () => {
    commandBusMock = { execute: jest.fn() };
    app = await Test.createTestingModule({
      controllers: [PreferenceController],
      providers: [PreferenceService,
        {
            provide: CommandBus,
            useValue: commandBusMock,
        }],
    }).compile();

    controller = app.get<PreferenceController>(PreferenceController);
    service = app.get<PreferenceService>(PreferenceService);
  });

  describe('getData', () => {
    it('should call service.getPreferences with the provided user', async () => {
      const user: IGetPreferencesRequest = {
        user: 'test',
      };

      const getPreferencesSpy = jest.spyOn(service, 'getPreferences');

      await controller.getData(user);

      expect(getPreferencesSpy).toHaveBeenCalledWith(user);
    });

    it('should return the result of service.getPreferences', async () => {
      const user: IGetPreferencesRequest = {
        user: 'test',
      };


      const expectedResult: IGetPreferencesResponse = {
        preferences: {
            user: 'test',
            location: 'test',
            budget: 1000,
            bedrooms: 1,
            bathrooms: 1,
            garages: 1,
            extras: []
        }
      }

      jest.spyOn(service, 'getPreferences').mockResolvedValue(expectedResult);

      const result = await controller.getData(user);

      expect(result).toEqual(expectedResult);
    });
  });
});
