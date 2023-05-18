import {
    IGetPreferencesRequest,
    IGetPreferencesResponse,
    GetPreferencesCommand
} from '@estate-match/api/prefrences/util';
  import { Injectable } from '@nestjs/common';
  import { CommandBus } from '@nestjs/cqrs';
  
  @Injectable()
  export class PreferenceService {
    constructor(private readonly commandBus: CommandBus) {}

    async getPreferences(
        request: IGetPreferencesRequest
    ): Promise<IGetPreferencesResponse> {
        return await this.commandBus.execute<
            GetPreferencesCommand,
            IGetPreferencesResponse
        >(new GetPreferencesCommand(request));
    }
  }
  