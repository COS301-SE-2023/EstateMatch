import { Injectable } from "@nestjs/common";
import { IGetMapRequest, IGetMapResponse } from "@estate-match/api/map/util";

@Injectable()
export class MapService {

    async getMap(request: IGetMapRequest): Promise<IGetMapResponse> {
        return { results: [] };
    }
}