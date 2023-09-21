import { Module } from '@nestjs/common';
import { TranslateController } from './translate.controller';
import { TranslateService } from './translate.service';
import { CqrsModule } from '@nestjs/cqrs'

import {
    TranslateHandler
} from './commands';

export const CommandHandlers = [
    TranslateHandler
];

@Module({
  imports: [CqrsModule],
  providers: [TranslateService, ...CommandHandlers],
  controllers: [TranslateController],
  exports: [TranslateService]
})
export class TranslateModule {}