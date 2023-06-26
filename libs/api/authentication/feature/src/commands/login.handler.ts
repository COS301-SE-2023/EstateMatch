import { AuthRepository } from "@estate-match/api/authentication/data-access";
import { LoginCommand } from "@estate-match/api/authentication/util";
import { ILoginResponse } from "@estate-match/api/authentication/util";
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(LoginCommand)
export class LoginHandler implements ICommandHandler<LoginCommand, ILoginResponse> {
    constructor(
        private readonly repository: AuthRepository,
        private readonly publisher: EventPublisher
    ) {}

    async execute(command: LoginCommand): Promise<any> {
        const user = await this.repository.findOne(command.request.login.username, command.request.login.password);
        if(!user) {
            return {message: 'User Login Failed'};
        }
        else {
            return {message: 'User Login Success'};
        }
    }
}