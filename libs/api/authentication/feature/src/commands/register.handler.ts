import { AuthRepository } from "@estate-match/api/authentication/data-access";
import { RegisterCommand } from "@estate-match/api/authentication/util";
import { IRegisterResponse } from "@estate-match/api/authentication/util";
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(RegisterCommand)
export class RegisterHandler implements ICommandHandler<RegisterCommand, IRegisterResponse> {
    constructor(
        private readonly repository: AuthRepository,
        private readonly publisher: EventPublisher
    ) {}

    async execute(command: RegisterCommand): Promise<any> {
        const user = await this.repository.create(command.request.register);
        if(!user) {
            return {message: 'User Register Failed'};
        }
        else {
            return {message: 'User Register Success'};
        }
    }
}