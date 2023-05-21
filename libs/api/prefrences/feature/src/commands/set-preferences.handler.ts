import { PreferencesRepository } from "@estate-match/api/prefrences/data-access";
import { PrefrencesModel } from "@estate-match/api/prefrences/schema";
import { SetPreferencesCommand, ISetPreferencesResponse } from "@estate-match/api/prefrences/util";
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(SetPreferencesCommand)
export class SetPreferencesHandler implements ICommandHandler<SetPreferencesCommand, ISetPreferencesResponse> {
    constructor(
        private readonly repository: PreferencesRepository,
        private readonly publisher: EventPublisher
    ) {}

    async execute(command: SetPreferencesCommand): Promise<any> {
        const request = command.request;
        const preferences = request.preferences; 
        return this.repository.create(preferences); 
    }

    //ready to query database
    // async create(preferences : PrefrencesModel) : Promise<PrefrencesModel> {
    //     return this.repository.create(preferences);
    // }

    
    // async findAll() : Promise<PrefrencesModel[]> {
    //     return await this.repository.findAll();
    // }

    // async findOne(id : string) : Promise<PrefrencesModel | null> {
    //     return this.repository.findOne(id);
    // }

    

    //  // //create function where parameters could be a query object (like in the video)
    // // async createPref(id : string, user :string, budget : number, location : string, bedrooms : number, bathrooms : number, garages : number) : Promise<PrefrencesModel> {
    // //    const newPref : PrefrencesModel = {id, user, budget, location, bedrooms, bathrooms, garages};
    // //    return this.preferencesRepository.create(newPref);
    // // }
    // //MAKE SURE UNDER NETWORK ACCESS IN MONOGO ATLAS YOU ADD YOU LOCAL IP ADDRESS TO ALLOW ACCESS TO THE DATABASE

    
    // async update(id : string, preferences : PrefrencesModel) : Promise<PrefrencesModel | null> {
    //     return this.repository.update(id, preferences);
    // }


}