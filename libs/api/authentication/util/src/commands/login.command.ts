import { ILoginRequest } from '../requests';

export class LoginCommand {
  constructor(public readonly request: ILoginRequest) {}
}