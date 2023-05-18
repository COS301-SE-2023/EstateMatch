import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from '@estate-match/api/core/feature';
import { CoreModule } from '@estate-match/api/core/feature';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [CoreModule, AppService],
})
export class AppModule {}
