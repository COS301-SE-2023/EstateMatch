import { PreferencesRepository } from '@estate-match/api/prefrences/data-access';
import { GetPreferencesCommand, IGetPreferencesResponse } from "@estate-match/api/prefrences/util";
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(GetPreferencesCommand)
export class GetPreferencesHandler implements ICommandHandler<GetPreferencesCommand, IGetPreferencesResponse> {
    constructor(
        private readonly repository: PreferencesRepository,
        private readonly publisher: EventPublisher
    ) {}

    async execute(command: GetPreferencesCommand): Promise<any> {
        const request = command.request;
        const user = request.user;  
        //ready to query database
        const prefResponse = await this.repository.findOne(user);
        return prefResponse;

    }
}