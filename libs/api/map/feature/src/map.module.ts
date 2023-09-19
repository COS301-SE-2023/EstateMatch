import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MapController } from './map.controller';
import { MapService } from './map.service';

import {
  GetMapHandler,
} from './commands';

export const CommandHandlers = [
    GetMapHandler
];

@Module({
  imports: [CqrsModule],
  providers: [MapService, ...CommandHandlers],
  controllers: [MapController],
  exports: [MapService]
})
export class MapModule {}