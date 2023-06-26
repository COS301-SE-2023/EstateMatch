import { PropertiesRepository } from "@estate-match/api/properties/data-access";
import { ICreatePropertyRequest, CreatePropertyCommand, ICreatePropertyResponse } from "@estate-match/api/properties/util";
import { CommandHandler, ICommandHandler, EventPublisher } from "@nestjs/cqrs";

@CommandHandler(CreatePropertyCommand)
export class CreatePropertyHandler implements ICommandHandler<CreatePropertyCommand> {
    constructor(
        private readonly propertiesRepository: PropertiesRepository,
        private readonly publisher: EventPublisher
    ) {}

    async execute(command: CreatePropertyCommand): Promise<any> {
        const request = command.request;
        const property = request.property;
        return await this.propertiesRepository.createProperty(property);
    }
}