import { Module } from '@nestjs/common';
import { ImageToTextService } from './ImageToText.service';
import { ImageToTextController } from './ImageToText.controller';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
    imports: [CqrsModule],
    controllers: [ImageToTextController],
    providers: [ImageToTextService],
    exports: [ImageToTextService]
})
export class ImageToTextModule {}