import { UserRepository } from "@estate-match/api/users/data-access";
import { SetUserLanguagePrefCommand, ISetUserLanguagePrefResponse } from "@estate-match/api/users/util";
import { CommandHandler, ICommandHandler, EventPublisher } from "@nestjs/cqrs";

@CommandHandler(SetUserLanguagePrefCommand)
export class SetUserLanguagePrefHandler implements ICommandHandler<SetUserLanguagePrefCommand, ISetUserLanguagePrefResponse> {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly publisher: EventPublisher
    ) {}
    
    async execute(command: SetUserLanguagePrefCommand): Promise<ISetUserLanguagePrefResponse> {
        const request = command.request;
        const user =  request.user;
        console.log(user);

        const success = await this.userRepository.updateLanguagePref(user, request.languagePref);

        if(success){
            return {languagePref: request.languagePref};
        }else{
            return {languagePref: "Error"};
        }
    }
}