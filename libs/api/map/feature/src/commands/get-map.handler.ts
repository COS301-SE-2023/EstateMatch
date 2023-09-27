import { CommandHandler } from "@nestjs/cqrs";
import { ICommandHandler } from "@nestjs/cqrs/dist/interfaces/commands/command-handler.interface";
import { GetMapCommand, IGetMapResponse } from "@estate-match/api/map/util";
import axios from "axios";

@CommandHandler(GetMapCommand)
export class GetMapHandler implements ICommandHandler<GetMapCommand> {

    // constructor(private readonly mapService: MapService) {}

    async execute(command: GetMapCommand): Promise<IGetMapResponse> {
        const longitude = command.request.longitude;
        const latitude = command.request.latitude;
        const type = command.request.type;

        const apiKey = process.env["GOOGLE_PLACES_API_KEY"] ;
        
        const testMap = await axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='+latitude+'%2C'+longitude+'&radius=5000&type='+type+'&key=' + apiKey);
        return {results: testMap.data.results};
    }
}
