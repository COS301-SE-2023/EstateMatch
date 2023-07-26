import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { CoreModule } from '@estate-match/api/core/feature';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'app'),
    }),
  ],
  controllers: [AppController],
  providers: [CoreModule],
})
export class AppModule {}
