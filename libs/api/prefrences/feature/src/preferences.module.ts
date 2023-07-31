import { Module } from '@nestjs/common';
import { PreferenceController } from './preferences.controller';
import { PreferenceService } from './preferences.service';
import { CqrsModule } from '@nestjs/cqrs';
import { PreferenceModule as PreferenceDataAccess} from '@estate-match/api/prefrences/data-access';

import {
  GetPreferencesHandler,
  SetPreferencesHandler,
  SetAIPreferencesHandler
} from './commands';

export const CommandHandlers = [
  GetPreferencesHandler,
  SetPreferencesHandler,
  SetAIPreferencesHandler
];

@Module({
  imports: [CqrsModule, PreferenceDataAccess],
  providers: [PreferenceService, ...CommandHandlers],
  controllers: [PreferenceController],
  exports: [PreferenceService]
})
export class PreferenceModule {}