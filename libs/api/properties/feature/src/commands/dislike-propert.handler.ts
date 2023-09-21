import { LikedPropertiesRepository, PropertiesRepository } from "@estate-match/api/properties/data-access";
import { DislikePropertyCommand, IDislikePropertyResponse } from "@estate-match/api/properties/util";
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(DislikePropertyCommand)
export class DislikePropertyHandler implements ICommandHandler<DislikePropertyCommand, IDislikePropertyResponse> {
    constructor(
        private readonly repository: LikedPropertiesRepository,
        private readonly propRepository: PropertiesRepository,
        private readonly publisher: EventPublisher
    ) {}

    async execute(command: DislikePropertyCommand): Promise<any> {
        const request = command.request;
        const property = request.property;  
        
        console.log(property);
        //ready to query database
        //ready to query database
        // const success = await this.repository.setLikedProperty(property);

        const username = request.property.user;
        const title = request.property.title;
        const remove = await this.propRepository.removePropertyfromUser(title, username);
       // console.log(remove);
        if(remove){
            const response = {
                message: 'property removed from property collection -dislike'
            };
            console.log(response);
            return response;
        }else{
            const response = {
                message: 'unexpected error'
            };
            console.log(response);
            return response;
        }

        // if(success){
        //     const response = {
        //         message: 'property disliked'
        //     };
        //     return response;
        // }else{
        //     const response = {
        //         message: 'unexpected error'
        //     };
        //     return response;
        // }
    }
}