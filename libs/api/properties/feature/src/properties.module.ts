import { Module } from '@nestjs/common';
import { PropertiesController } from './properties.controller';
import { PropertiesService } from './properties.service';
import { CqrsModule } from '@nestjs/cqrs';

import {
    DislikePropertyHandler
} from './commands';

export const CommandHandlers = [
    DislikePropertyHandler
];

@Module({
  imports: [CqrsModule],
  providers: [PropertiesService, ...CommandHandlers],
  controllers: [PropertiesController],
  exports: [PropertiesService]
})
export class PropertiesModule {}