import { IGetPreferencesRequest } from '../requests';

export class GetAIPreferencesCommand {
  constructor(public readonly request: IGetPreferencesRequest) {}
}