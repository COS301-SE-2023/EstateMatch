import { LoginCommand } from "@estate-match/api/authentication/util";
import { ILoginResponse } from "@estate-match/api/authentication/util";
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(LoginCommand)
export class LoginHandler implements ICommandHandler<LoginCommand, ILoginResponse> {
    constructor(
        // private readonly repository: PreferencesRepository,
        private readonly publisher: EventPublisher
    ) {}

    async execute(command: LoginCommand): Promise<any> {
        return {message: command.request.login.password}; 
    }
}