import { LikedPropertiesRepository } from "@estate-match/api/properties/data-access";
import { DislikePropertyCommand, IDislikePropertyResponse } from "@estate-match/api/properties/util";
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(DislikePropertyCommand)
export class DislikePropertyHandler implements ICommandHandler<DislikePropertyCommand, IDislikePropertyResponse> {
    constructor(
        private readonly repository: LikedPropertiesRepository,
        private readonly publisher: EventPublisher
    ) {}

    async execute(command: DislikePropertyCommand): Promise<any> {
        const request = command.request;
        const property = request.property;  
        
        console.log(property);
        //ready to query database
        //ready to query database
        const success = await this.repository.setLikedProperty(property);

        if(success){
            const response = {
                message: 'property disliked'
            };
            return response;
        }else{
            const response = {
                message: 'unexpected error'
            };
            return response;
        }
    }
}