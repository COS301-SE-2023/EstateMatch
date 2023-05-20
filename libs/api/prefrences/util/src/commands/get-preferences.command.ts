import { IGetPreferencesRequest } from '../requests';

export class GetPreferencesCommand {
  constructor(public readonly request: IGetPreferencesRequest) {}
}