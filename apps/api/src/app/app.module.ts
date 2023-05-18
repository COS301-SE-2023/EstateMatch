import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { CoreModule } from '@estate-match/api/core/feature';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [CoreModule],
})
export class AppModule {}
