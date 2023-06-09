import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthenticationModule as AuthenticationDataAccess} from '@estate-match/api/authentication/data-access';
import { UserModule as UserDataAccess} from '@estate-match/api/users/data-access';
import { AuthController } from './authentication.controller';
import { AuthService } from './authentication.service';

import {
  LoginHandler,
  RegisterHandler
} from './commands';

export const CommandHandlers = [
    LoginHandler,
    RegisterHandler
];

@Module({
  imports: [CqrsModule, AuthenticationDataAccess, UserDataAccess],
  providers: [AuthService, ...CommandHandlers],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthenticationModule {}