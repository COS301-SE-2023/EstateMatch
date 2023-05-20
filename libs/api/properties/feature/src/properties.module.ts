import { Module } from '@nestjs/common';
import { PropertiesController } from './properties.controller';
import { PropertiesService } from './properties.service';
import { CqrsModule } from '@nestjs/cqrs';

// import {
//   GetPreferencesHandler,
//   SetPreferencesHandler,
// } from './commands';

// export const CommandHandlers = [
//   GetPreferencesHandler,
//   SetPreferencesHandler,
// ];

@Module({
  imports: [CqrsModule],
  providers: [PropertiesService],
  controllers: [PropertiesController],
  exports: [PropertiesService]
})
export class PreferenceModule {}