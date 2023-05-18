import { Module } from '@nestjs/common';
import { PreferenceController } from './preferences.controller';
import { PreferenceService } from './preferences.service';
import { CqrsModule } from '@nestjs/cqrs';

import {
  GetPreferencesHandler
} from './commands';

export const CommandHandlers = [
  GetPreferencesHandler
];

@Module({
  imports: [CqrsModule],
  providers: [PreferenceService, ...CommandHandlers],
  controllers: [PreferenceController],
  exports: [PreferenceService]
})
export class PreferenceModule {}