import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ISearchRequest, ISearchResponse, SearchQuery } from '@estate-match/api/search/util';

@Injectable()
export class SearchService{
    constructor(
        private readonly queryBus: QueryBus,
    ){}

    async getUser(
        request: ISearchRequest
    ): Promise<ISearchResponse>{
        return await this.queryBus.execute<
        SearchQuery,
        ISearchResponse
        >(new SearchQuery(request))
    }
}