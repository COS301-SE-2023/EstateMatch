import { Injectable } from "@nestjs/common";
import { IGetMapRequest, IGetMapResponse } from "@estate-match/api/map/util";
import { GetMapCommand } from "@estate-match/api/map/util";
import { CommandBus } from "@nestjs/cqrs";

@Injectable()
export class MapService {
    constructor(private readonly commandBus: CommandBus) {}

    async getMap(request: IGetMapRequest): Promise<IGetMapResponse> {
        return await this.commandBus.execute<
            GetMapCommand, IGetMapResponse>(new GetMapCommand(request));
    }
}