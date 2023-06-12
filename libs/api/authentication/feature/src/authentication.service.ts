import { ILogin, 
    ILoginRequest, 
    ILoginResponse,
    LoginCommand
 } from '@estate-match/api/authentication/util';
  import { Injectable } from '@nestjs/common';
  import { CommandBus } from '@nestjs/cqrs';
  
  @Injectable()
  export class AuthService {
    constructor(private readonly commandBus: CommandBus) {}

    async login(
        request: ILoginRequest
    ): Promise<ILoginResponse> {
        return await this.commandBus.execute<
            LoginCommand,
            ILoginResponse
        >(new LoginCommand(request));
    }
  }
  