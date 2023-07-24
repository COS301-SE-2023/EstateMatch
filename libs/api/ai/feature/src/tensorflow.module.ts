import { Module } from '@nestjs/common';
import { TensorflowService } from './tensorflow.service';
import { TensorflowController } from './tensorflow.controller';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
    imports: [CqrsModule],
    controllers: [TensorflowController],
    providers: [TensorflowService],
    exports: [TensorflowService]
})
export class TensorflowModule {}