import { Module } from '@nestjs/common';
import { MatchController } from './match.controller';
import { MatchService } from './match.service';
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
  providers: [MatchService, ...CommandHandlers],
  controllers: [MatchController],
  exports: [MatchService]
})
export class MatchModule {}