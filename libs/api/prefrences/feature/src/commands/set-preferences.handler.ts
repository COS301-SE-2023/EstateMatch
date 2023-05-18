//import { PreferenceRepository } from '@estate-match/api/prefrences/data-access';
import { SetPreferencesCommand, ISetPreferencesResponse } from "@estate-match/api/prefrences/util";
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(SetPreferencesCommand)
export class SetPreferencesHandler implements ICommandHandler<SetPreferencesCommand, ISetPreferencesResponse> {
    constructor(
        //private readonly repository: PreferenceRepository,
        private readonly publisher: EventPublisher
    ) {}

    async execute(command: SetPreferencesCommand): Promise<any> {
        const request = command.request;
        const preferences = request.preferences; 
        console.log(preferences); 

        //ready to query database
    }
}