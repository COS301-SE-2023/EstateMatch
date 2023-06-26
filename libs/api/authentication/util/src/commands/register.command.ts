import { IRegisterRequest } from '../requests';

export class RegisterCommand {
  constructor(public readonly request: IRegisterRequest) {}
}