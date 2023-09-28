import { AIPreferencesRepository } from "@estate-match/api/prefrences/data-access";
import { PrefrencesModel } from "@estate-match/api/prefrences/schema";
import { SetAIPreferencesCommand, ISetAIPreferencesResponse, IAIPreference } from "@estate-match/api/prefrences/util";
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(SetAIPreferencesCommand)
export class SetAIPreferencesHandler implements ICommandHandler<SetAIPreferencesCommand, ISetAIPreferencesResponse> {
    constructor(
        private readonly repository: AIPreferencesRepository,
    ) {}

    async execute(command: SetAIPreferencesCommand): Promise<any> {
        const request = command.request;
        const user = request.user;
        const labels = request.labels; 
        const floorTypes = [];
        const buildingStyles = [];
        const buildingTypes = [];
        const buildingAreas = [];
        const buildingFeatures = [];
        const materials = [];

        for (const label of labels) {
            if (label.includes("flooring")) {
                floorTypes.push(label);
            }
            if (label.includes("design")) {
                buildingStyles.push(label);
            }
            if (label === 'Commercial building' || label === 'Penthouse apartment' ) {
                buildingTypes.push(label);
            }
            if (label === 'Neighborhood' || label.includes('Residential') || label === 'Suburb')  {
                buildingAreas.push(label);
            }
            if (label === 'Garden' || label ===  'Courtyard' || label === 'Swimming pool' || label === 'Porch' || label === 'Dining room') {
                buildingFeatures.push(label);
            }
            if (label ===  'Hardwood' || label === 'Plywood' || label === 'Tile' || label === 'Natural material'||  label === 'Cobblestone' ) {
                materials.push(label);
            }
        }

        const aiPrefRequest: IAIPreference = {
            user: user,
            flooring: floorTypes,
            buildingStyle: buildingStyles,
            buildingType: buildingTypes,
            buildingArea: buildingAreas,
            buildingFeatures: buildingFeatures,
            materials: materials,
          };

        //Query the database for the user's AI preferences
        const userAIPreferences = await this.repository.findOne(user);
        if(!userAIPreferences) {
            //If the user's AI preferences do not exist, create them
            const result = await this.repository.create(aiPrefRequest);
            if(result){
                const response: ISetAIPreferencesResponse = {updated: true};
                return response;
            }
        }else{
            const result = await this.repository.update(user, aiPrefRequest);
            if(result){
                const response: ISetAIPreferencesResponse = {updated: true};
                return response;
            }
        }
    }
}