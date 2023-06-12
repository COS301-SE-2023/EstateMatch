import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthenticationModule as AuthenticationDataAccess} from '@estate-match/api/authentication/data-access';
import { AuthController } from './authentication.controller';
import { AuthService } from './authentication.service';

import {
  LoginHandler,
} from './commands';

export const CommandHandlers = [
    LoginHandler
];

@Module({
  imports: [CqrsModule, AuthenticationDataAccess],
  providers: [AuthService, ...CommandHandlers],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthenticationModule {}