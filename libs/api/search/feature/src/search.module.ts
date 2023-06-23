// import { Module } from '@nestjs/common';
// import { CqrsModule } from '@nestjs/cqrs';
// import { BrowseModule as BrowseModuleDA } from '@mp/api/browse/data-access';
// import { BrowseService } from './browse.service';

// import {
//   GetUserHandler,
//   GetTrendingHandler
// } from './queries'


// export const QueryHandlers = [
//     GetUserHandler,
//     GetTrendingHandler
// ];

// @Module (
//   {
//     imports: [CqrsModule, BrowseModuleDA],
//    providers: [BrowseService, ...QueryHandlers],
//    exports: [BrowseService],
//   }
// )

// export class BrowseModule {}