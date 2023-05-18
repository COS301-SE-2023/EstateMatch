import { ISetPreferencesRequest } from '../requests';

export class SetPreferencesCommand {
  constructor(public readonly request: ISetPreferencesRequest) {}
}