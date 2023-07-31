import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CoreController } from './core.controller';
import { PreferenceModule } from '@estate-match/api/prefrences/feature';
import { PropertiesModule } from '@estate-match/api/properties/feature';
import { AuthenticationModule } from '@estate-match/api/authentication/feature';
import { UserModule } from '@estate-match/api/users/feature'
import { SearchModule } from '@estate-match/api/search/feature';
import { WebScraperModule } from '@estate-match/api/webscraper/feature';
import { TensorflowModule } from '@estate-match/api/ai/feature';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

const DATABASE_CONNECTION = process.env['DATABASE_CONNECTION'] || '';


@Module({
  imports: [
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '..', 'app'),
    // }),
    MongooseModule.forRoot(DATABASE_CONNECTION),
    PreferenceModule,
    PropertiesModule,
    AuthenticationModule,
    UserModule,
    SearchModule,
    WebScraperModule,
    TensorflowModule,
  ],
  controllers: [CoreController],
})
export class CoreModule {}