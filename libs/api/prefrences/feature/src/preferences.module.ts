import { Module } from '@nestjs/common';
import { PreferenceController } from './preferences.controller';

@Module({
  imports: [],
  controllers: [PreferenceController],
})
export class PreferenceModule {}