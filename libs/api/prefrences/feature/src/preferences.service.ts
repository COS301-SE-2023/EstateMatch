import {
    IGetPreferencesRequest,
    IGetPreferencesResponse,
    GetPreferencesCommand,
    ISetPreferencesRequest,
    ISetPreferencesResponse,
    SetPreferencesCommand,
    ISetAIPreferencesRequest,
    SetAIPreferencesCommand,
    ISetAIPreferencesResponse,
    IGetAIPreferencesResponse,
    GetAIPreferencesCommand
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

    async setPreferences(
        request: ISetPreferencesRequest
    ): Promise<ISetPreferencesResponse> {
        return await this.commandBus.execute<
            SetPreferencesCommand,
            ISetPreferencesResponse
        >(new SetPreferencesCommand(request));
    }

    async setAIPreferences(
        request: ISetAIPreferencesRequest
    ): Promise<ISetAIPreferencesResponse> {
        return await this.commandBus.execute<
            SetAIPreferencesCommand,
            ISetAIPreferencesResponse
        >(new SetAIPreferencesCommand(request));
    }

    async getAIPreferences(
        request: IGetPreferencesRequest
    ): Promise<IGetAIPreferencesResponse> {
        return await this.commandBus.execute<
            GetAIPreferencesCommand,
            IGetAIPreferencesResponse
        >(new GetAIPreferencesCommand(request));
    }
  }
  