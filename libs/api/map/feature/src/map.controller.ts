export class MapController{
    constructor(private readonly mapService: MapService) {}

    @Post('/getMap')
    async getMap(@Body() request: IGetMapRequest) {
        return await this.mapService.getMap(request);
    }
}