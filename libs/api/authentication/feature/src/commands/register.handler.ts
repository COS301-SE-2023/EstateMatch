import { AuthRepository } from "@estate-match/api/authentication/data-access";
import { RegisterCommand } from "@estate-match/api/authentication/util";
import { IRegisterResponse } from "@estate-match/api/authentication/util";
import { UserRepository } from "@estate-match/api/users/data-access";
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(RegisterCommand)
export class RegisterHandler implements ICommandHandler<RegisterCommand, IRegisterResponse> {
    constructor(
        private readonly repository: AuthRepository,
        private readonly userRepo: UserRepository,
        private readonly publisher: EventPublisher
    ) {}

    async execute(command: RegisterCommand): Promise<any> {
        const user = await this.repository.create(command.request.register);
        if(!user) {
            return {message: 'User Register Failed'};
        }
        else {
            const newUser = {
                username: command.request.register.username,
                email: command.request.register.email,
                firstName: command.request.register.firstName,
                lastName: command.request.register.lastName,
                properties: [], //made it null since the user does not need to have properties when they register
                languagePref: command.request.register.languagePref,
            }

            await this.userRepo.create(newUser);

            return {message: 'User Register Success'};
        }
    }
}