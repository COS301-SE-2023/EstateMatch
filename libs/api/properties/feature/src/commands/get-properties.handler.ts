import { PropertiesRepository } from "@estate-match/api/properties/data-access";
import { GetPropertiesCommand, IGetPropertyRequest, IGetPropertyResponse } from "@estate-match/api/properties/util";
import { CommandHandler, ICommandHandler, EventPublisher} from "@nestjs/cqrs";

@CommandHandler(GetPropertiesCommand)
export class GetPropertiesHandler implements ICommandHandler<GetPropertiesCommand> {
    constructor(
        private readonly propertiesRepository: PropertiesRepository,
        private readonly publisher: EventPublisher
    ) {}

    async execute(command: GetPropertiesCommand): Promise<any> {
        const request = command.request;
        const property = request.property;
        return await this.propertiesRepository.getProperties();
    }
}