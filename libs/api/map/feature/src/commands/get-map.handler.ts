import { CommandHandler } from "@nestjs/cqrs";

@CommandHandler(GetMapCommand)
export class GetMapHandler implements ICommandHandler<GetMapCommand> {

    constructor(private readonly mapService: MapService) {}

    async execute(command: GetMapCommand): Promise<IGetMapResponse> {
        return this.mapService.getMap(command);
    }
}
