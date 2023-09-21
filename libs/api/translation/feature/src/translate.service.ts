import {Injectable} from '@nestjs/common';
import { TranslateCommand, ITranslateRequest, ITranslateResponse } from '@estate-match/api/translation/util';
import { CommandBus } from '@nestjs/cqrs';

@Injectable()
export class TranslateService {
    constructor(private readonly commandBus: CommandBus) {}
    
    async translate(request: ITranslateRequest): Promise<ITranslateResponse> {
        return await this.commandBus.execute<
            TranslateCommand, ITranslateResponse>(new TranslateCommand(request));
    }
}