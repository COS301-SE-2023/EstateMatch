import { AIPreferencesRepository } from '@estate-match/api/prefrences/data-access';
import { GetAIPreferencesCommand, IGetAIPreferencesResponse } from "@estate-match/api/prefrences/util";
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(GetAIPreferencesCommand)
export class GetAIPreferencesHandler implements ICommandHandler<GetAIPreferencesCommand, IGetAIPreferencesResponse> {
    constructor(
        private readonly repository: AIPreferencesRepository,
        private readonly publisher: EventPublisher
    ) {}

    async execute(command: GetAIPreferencesCommand): Promise<IGetAIPreferencesResponse> {
        const request = command.request;
        const user = request.user;  
        //ready to query database
        const prefResponse = await this.repository.findOne(user);

        if(prefResponse){
            return {aiPreferences: prefResponse};
        }else{
            return {aiPreferences: null};
        }
    }
}