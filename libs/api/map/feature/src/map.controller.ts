import { IGetMapRequest } from '@estate-match/api/map/util';
import { Body, Controller, Post } from '@nestjs/common';
import { MapService } from './map.service';

@Controller()
export class MapController{
    constructor(private readonly mapService: MapService) {}

    @Post('/getMap')
    async getMap(@Body() request: IGetMapRequest) {
        return await this.mapService.getMap(request);
    }
}