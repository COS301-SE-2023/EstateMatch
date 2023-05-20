// import { PropertiesRepository } from '@estate-match/api/properties/data-access';
import { DislikePropertyCommand, IDislikePropertyResponse } from "@estate-match/api/properties/util";
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(DislikePropertyCommand)
export class DislikePropertyHandler implements ICommandHandler<DislikePropertyCommand, IDislikePropertyResponse> {
    constructor(
        // private readonly repository: PreferencesRepository,
        private readonly publisher: EventPublisher
    ) {}

    async execute(command: DislikePropertyCommand): Promise<any> {
        const request = command.request;
        const property = request.property;  
        
        console.log(property);
        //ready to query database
        const success = true;

        if(success){
            return 'property disliked';
        }else{
            return 'unexpected error';
        }
    }
}