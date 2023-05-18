import { Module } from '@nestjs/common';
import { PreferenceController } from './preferences.controller';
import { PreferenceService } from './preferences.service';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [CqrsModule],
  providers: [PreferenceService],
  controllers: [PreferenceController],
  exports: [PreferenceService]
})
export class PreferenceModule {}