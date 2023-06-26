import { UserRepository } from "@estate-match/api/users/data-access";
import { SetUserCommand, ISetUserResponse } from "@estate-match/api/users/util";
import { CommandHandler, ICommandHandler, EventPublisher } from "@nestjs/cqrs";

@CommandHandler(SetUserCommand)
export class SetUserHandler implements ICommandHandler<SetUserCommand, ISetUserResponse> {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly publisher: EventPublisher
    ) {}
    
    async execute(command: SetUserCommand): Promise<any> {
        const request = command.request;
        const user =  request.user;
        return this.userRepository.create(user);
    }
}