import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PropertiesModule as PropertiesModuleDA } from '@estate-match/api/properties/data-access';
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
    imports: [CqrsModule, PropertiesModuleDA],
    providers: [SearchService, ...QueryHandlers],
    controllers: [SearchController],
    exports: [SearchService],
  }
)

export class SearchModule {}