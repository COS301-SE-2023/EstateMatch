import { CommandHandler } from "@nestjs/cqrs";
import { ICommandHandler } from "@nestjs/cqrs/dist/interfaces/commands/command-handler.interface";
import { GetMapCommand } from "@estate-match/api/map/util";

@CommandHandler(GetMapCommand)
export class GetMapHandler implements ICommandHandler<GetMapCommand> {

    constructor(private readonly mapService: MapService) {}

    async execute(command: GetMapCommand): Promise<IGetMapResponse> {
        return this.mapService.getMap(command);
    }
}
