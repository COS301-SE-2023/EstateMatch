import { Module } from '@nestjs/common';
import { TensorflowService } from './ImageToText.service';
import { TensorflowController } from './ImageToText.controller';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
    imports: [CqrsModule],
    controllers: [TensorflowController],
    providers: [TensorflowService],
    exports: [TensorflowService]
})
export class TensorflowModule {}