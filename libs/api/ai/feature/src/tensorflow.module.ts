import { Module } from '@nestjs/common';
import { TensorflowService } from './tensorflow.service';
import { TensorflowController } from './tensorflow.controller';

@Module({
    controllers: [TensorflowController],
    providers: [TensorflowService],
})
export class TensorflowModule {}