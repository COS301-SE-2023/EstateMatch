import { LikePropertyCommand, ILikePropertyResponse } from "@estate-match/api/properties/util";
import { LikedPropertiesRepository, PropertiesRepository } from "@estate-match/api/properties/data-access";
import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";

@CommandHandler(LikePropertyCommand)
export class LikePropertyHandler implements ICommandHandler<LikePropertyCommand, ILikePropertyResponse> {
    constructor(
        private readonly repository: LikedPropertiesRepository,
        private readonly propRepository: PropertiesRepository,
        private readonly publisher: EventPublisher
    ) {}

    async execute(command: LikePropertyCommand): Promise<any> {
        const request = command.request;
        const property = request.property;  
        
        //console.log(property);
        //ready to query database
       // const success = await this.repository.setLikedProperty(property);
        //import property repository and call remove property function
        const username = request.property.user;
        const title = request.property.title;
        const remove = await this.propRepository.removePropertyfromUser(title, username);
       // console.log(remove);
        if(remove){
            const response = {
                message: 'property removed from property collection'
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
        //         message: 'property liked'
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