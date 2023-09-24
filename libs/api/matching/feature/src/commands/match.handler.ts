import { IMatchResponse, MatchCommand } from "@estate-match/api/matching/util";
import { CommandHandler, ICommandHandler, EventPublisher } from "@nestjs/cqrs";

@CommandHandler(MatchCommand)
export class MatchHandler implements ICommandHandler<MatchCommand> {
    constructor(private readonly eventPublisher: EventPublisher){} 

    async execute(command: MatchCommand): Promise<IMatchResponse> {
        const property = command.request.property;
        const preferences = command.request.preferences;

        let score = 0;

        if(preferences.buildingArea.length > 0 && preferences.buildingFeatures.length > 0 && preferences.buildingStyle.length > 0 && preferences.buildingType.length > 0 && preferences.flooring.length > 0 && preferences.materials.length > 0){

            property.aiLabel.forEach(label => {
                preferences.buildingArea.forEach(area => {
                    if(area === label){
                        score++;
                    }
                })
            })

            property.aiLabel.forEach(label => {
                preferences.buildingFeatures.forEach(features => {
                    if(features === label){
                        score++;
                    }
                })
            })

            property.aiLabel.forEach(label => {
                preferences.buildingStyle.forEach(style => {
                    if(style === label){
                        score++;
                    }
                })
            })

            property.aiLabel.forEach(label => {
                preferences.buildingType.forEach(type => {
                    if(type === label){
                        score++;
                    }
                })
            })

            property.aiLabel.forEach(label => {
                preferences.flooring.forEach(floor => {
                    if(floor === label){
                        score++;
                    }
                })
            })

            property.aiLabel.forEach(label => {
                preferences.materials.forEach(material => {
                    if(material === label){
                        score++;
                    }
                })
            })

            score = score / property.aiLabel.length;
        }

        const response: IMatchResponse = {
            matchScore: score
        }
        return  response;
    }
}