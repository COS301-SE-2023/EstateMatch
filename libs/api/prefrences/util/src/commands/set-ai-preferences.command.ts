import { ISetAIPreferencesRequest } from '../requests';

export class SetAIPreferencesCommand {
  constructor(public readonly request: ISetAIPreferencesRequest) {}
}