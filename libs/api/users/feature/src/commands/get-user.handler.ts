import { UserRepository } from "@estate-match/api/users/data-access";
import { GetUserCommand, IGetUserResponse } from "@estate-match/api/users/util";
import { CommandHandler, ICommandHandler, EventPublisher } from "@nestjs/cqrs";

@CommandHandler(GetUserCommand)
export class GetUserHandler implements ICommandHandler<GetUserCommand, IGetUserResponse> {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly publisher: EventPublisher
    ) {}
    
    async execute(command: GetUserCommand): Promise<any> {
        const request = command.request;
        const user =  request.user;
        return this.userRepository.findOne(user);
    }
}