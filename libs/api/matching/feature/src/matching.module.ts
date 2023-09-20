import { Module } from '@nestjs/common';
import { MatchingController } from './matching.controller';
import { MatchingService } from './matching.service';
import { CqrsModule } from '@nestjs/cqrs';
import { PropertiesModule as PropertiesDataAccessModule } from '@estate-match/api/properties/data-access';

import {
    MatchHandler
} from './commands';

export const CommandHandlers = [
    MatchHandler
];

@Module({
  imports: [CqrsModule, PropertiesDataAccessModule],
  providers: [MatchingService, ...CommandHandlers],
  controllers: [MatchingController],
  exports: [MatchingService]
})
export class MatchModule {}