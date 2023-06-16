import { UpdateUserCommand, IUpdateUserResponse } from "@estate-match/api/users/util";
import { UserRepository } from "@estate-match/api/users/data-access";
import { CommandHandler, ICommandHandler, EventPublisher } from "@nestjs/cqrs";

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand, IUpdateUserResponse> {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly publisher: EventPublisher
    ) {}

    async execute(command: UpdateUserCommand): Promise<IUpdateUserResponse> {
        const request = command.request;
        const user =  request.user;
        this.userRepository.update(user.id, user);

        if(!user){
            return {
                success: false,
            }
        }

        return {   
            success: true,
        }
        
    }
}