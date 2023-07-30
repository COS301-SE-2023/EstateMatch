import { AIPreferencesRepository } from "@estate-match/api/prefrences/data-access";
import { PrefrencesModel } from "@estate-match/api/prefrences/schema";
import { SetAIPreferencesCommand, ISetAIPreferencesResponse } from "@estate-match/api/prefrences/util";
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(SetAIPreferencesCommand)
export class SetAIPreferencesHandler implements ICommandHandler<SetAIPreferencesCommand, ISetAIPreferencesResponse> {
    constructor(
        private readonly repository: AIPreferencesRepository,
    ) {}

    async execute(command: SetAIPreferencesCommand): Promise<any> {
        const request = command.request;
        const preferences = request.preferences; 

        //Query the database for the user's AI preferences
        const userAIPreferences = await this.repository.findOne(preferences.user);
        if(!userAIPreferences) {
            //If the user's AI preferences do not exist, create them
            await this.repository.create(preferences);
        }else{
            console.log(userAIPreferences);
        }
    }
}