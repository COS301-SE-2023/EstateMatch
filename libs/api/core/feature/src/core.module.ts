import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CoreController } from './core.controller';
import { PreferenceModule } from '@estate-match/api/prefrences/feature';
import { PropertiesModule } from '@estate-match/api/properties/feature';
import { AuthenticationModule } from '@estate-match/api/authentication/feature';
import { UserModule } from '@estate-match/api/users/feature'
import { SearchModule } from '@estate-match/api/search/feature';
import { ChatModule } from '@estate-match/api/chat/feature';
import { WebScraperModule } from '@estate-match/api/webscraper/feature';
import { ImageToTextModule } from '@estate-match/api/ai/feature';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MatchModule } from '@estate-match/api/matching/feature';
import { TensorflowModule } from '@estate-match/api/ai/feature';
import { TranslateModule } from '@estate-match/api/translation/feature';

const DATABASE_CONNECTION = process.env['DATABASE_CONNECTION'] || '';

@Module({
  imports: [
    MongooseModule.forRoot(DATABASE_CONNECTION),
    PreferenceModule,
    PropertiesModule,
    AuthenticationModule,
    UserModule,
    SearchModule,
    ChatModule,
    WebScraperModule,
    TensorflowModule,
    TranslateModule
    ImageToTextModule,
    MatchModule
  ],
  controllers: [CoreController],
})
export class CoreModule {}