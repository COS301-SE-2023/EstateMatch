import { LikePropertyCommand, ILikePropertyResponse } from "@estate-match/api/properties/util";
import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";

@CommandHandler(LikePropertyCommand)
export class LikePropertyHandler implements ICommandHandler<LikePropertyCommand, ILikePropertyResponse> {
    constructor(
        // private readonly repository: PreferencesRepository,
        private readonly publisher: EventPublisher
    ) {}

    async execute(command: LikePropertyCommand): Promise<any> {
        const request = command.request;
        const property = request.property;  
        
        console.log(property);
        //ready to query database
        const success = true;

        if(success){
            return 'property liked';
        }else{
            return 'unexpected error';
        }
    }
}