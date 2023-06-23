import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
// import { SearchModule as SearchModuleDA } from '@mp/api/search/data-access';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';

import {
  SearchHandler,
} from './queries'


export const QueryHandlers = [
    SearchHandler,
];

@Module (
  {
    imports: [CqrsModule, /*SearchModuleDA*/],
    providers: [SearchService, ...QueryHandlers],
    controllers: [SearchController],
    exports: [SearchService],
  }
)

export class SearchModule {}