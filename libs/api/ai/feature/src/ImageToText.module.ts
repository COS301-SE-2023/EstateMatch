import { Module } from '@nestjs/common';
import { ImageToTextService } from './ImageToText.service';
import { ImageToTextController } from './ImageToText.controller';
import { PreferenceModule as PreferenceModuleDataAccess } from '@estate-match/api/prefrences/data-access';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
    imports: [CqrsModule, PreferenceModuleDataAccess],
    controllers: [ImageToTextController],
    providers: [ImageToTextService],
    exports: [ImageToTextService]
})
export class ImageToTextModule {}