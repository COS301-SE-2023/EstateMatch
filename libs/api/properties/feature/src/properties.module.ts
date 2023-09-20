import { Module } from '@nestjs/common';
import { PropertiesController } from './properties.controller';
import { PropertiesService } from './properties.service';
import { CqrsModule } from '@nestjs/cqrs';
import { PropertiesModule as PropertiesDataAccessModule } from '@estate-match/api/properties/data-access';

import {
    DislikePropertyHandler,
    LikePropertyHandler,
    GetLikedPropertiesHandler,
    GetPropertiesHandler, 
    CreatePropertyHandler
} from './commands';

import {
    CheckPropertyHandler,
    GetUserPropertiesHandler
} from './queries';

export const CommandHandlers = [
    DislikePropertyHandler,
    LikePropertyHandler,
    GetLikedPropertiesHandler,
    GetPropertiesHandler, 
    CreatePropertyHandler
];

export const QueryHandlers = [
    CheckPropertyHandler,
    GetUserPropertiesHandler
];

@Module({
  imports: [CqrsModule, PropertiesDataAccessModule],
  providers: [PropertiesService, ...CommandHandlers, ...QueryHandlers],
  controllers: [PropertiesController],
  exports: [PropertiesService]
})
export class PropertiesModule {}