import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CqrsModule } from '@nestjs/cqrs';
import { UserModule as UserDataAccessModule } from '@estate-match/api/users/data-access';

import {
    GetUserHandler,
    SetUserHandler,
    UpdateUserHandler,
    SetUserLanguagePrefHandler
} from './commands';

export const CommandHandlers = [
    GetUserHandler,
    SetUserHandler,
    UpdateUserHandler,
    SetUserLanguagePrefHandler
];

@Module({
  imports: [CqrsModule, UserDataAccessModule],
  providers: [UserService, ...CommandHandlers],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule {}