import { Module } from '@nestjs/common';
import { PropertiesController } from './properties.controller';
import { PropertiesService } from './properties.service';
import { CqrsModule } from '@nestjs/cqrs';
import { PropertiesModule as PropertiesDataAccessModule } from '@estate-match/api/properties/data-access';

import {
    DislikePropertyHandler,
    LikePropertyHandler,
    GetLikedPropertiesHandler
} from './commands';

export const CommandHandlers = [
    DislikePropertyHandler,
    LikePropertyHandler,
    GetLikedPropertiesHandler
];

@Module({
  imports: [CqrsModule, PropertiesDataAccessModule],
  providers: [PropertiesService, ...CommandHandlers],
  controllers: [PropertiesController],
  exports: [PropertiesService]
})
export class PropertiesModule {}