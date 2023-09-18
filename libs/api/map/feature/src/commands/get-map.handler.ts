import { CommandHandler } from "@nestjs/cqrs";
import { ICommandHandler } from "@nestjs/cqrs/dist/interfaces/commands/command-handler.interface";
import { GetMapCommand, IGetMapResponse } from "@estate-match/api/map/util";
import axios from "axios";

@CommandHandler(GetMapCommand)
export class GetMapHandler implements ICommandHandler<GetMapCommand> {

    // constructor(private readonly mapService: MapService) {}

    async execute(command: GetMapCommand): Promise<IGetMapResponse> {
        const apiKey = process.env["GOOGLE_PLACES_API_KEY"] ;
        console.log(apiKey);
        const testMap = await axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=40.7127281%2C-74.0060152&radius=1500&type=school&key=' + apiKey);
        return testMap.data.results;
    }
}
