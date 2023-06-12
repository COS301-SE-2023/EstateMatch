import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PreferenceModule as PreferenceDataAccess} from '@estate-match/api/prefrences/data-access';
import { AuthController } from './authentication.controller';
import { AuthService } from './authentication.service';

import {
  LoginHandler,
} from './commands';

export const CommandHandlers = [
    LoginHandler
];

@Module({
  imports: [CqrsModule],
  providers: [AuthService, ...CommandHandlers],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthenticationModule {}