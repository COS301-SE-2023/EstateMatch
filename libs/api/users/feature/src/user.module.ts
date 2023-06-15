import {Module} from '@nestjs/common';  
import {UserController} from './user.controller';
import {UserService} from './user.service';
import { CqrsModule } from '@nestjs/cqrs';
import {UserModule as UserDataAccessModule} from '@estate-match/api/users/data-access';

//import handlers
import {GetUserHandler, SetUserHandler} from './commands';


export const UserCommandHandlers = [
    GetUserHandler,
    SetUserHandler
];

@Module({
    imports: [UserDataAccessModule, CqrsModule],
    controllers: [UserController],
    providers: [
        UserService,
        ...UserCommandHandlers
    ],
    exports: [UserService]
})
export class UserModule {}