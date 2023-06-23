import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
// import { SearchModule as SearchModuleDA } from '@mp/api/search/data-access';
import { SearchService } from './search.service';

// import {
//   GetUserHandler,
//   GetTrendingHandler
// } from './queries'


// export const QueryHandlers = [
//     GetUserHandler,
//     GetTrendingHandler
// ];

@Module (
  {
    imports: [CqrsModule, /*SearchModuleDA*/],
   providers: [SearchService, /*...QueryHandlers*/],
   exports: [SearchService],
  }
)

export class SearchModule {}