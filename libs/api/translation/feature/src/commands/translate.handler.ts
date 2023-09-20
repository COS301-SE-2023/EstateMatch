import { TranslateCommand, ITranslateResponse } from "@estate-match/api/translation/util";
import { CommandHandler, ICommandHandler, EventPublisher } from "@nestjs/cqrs";

@CommandHandler(TranslateCommand)
export class TranslateHandler implements ICommandHandler<TranslateCommand, ITranslateResponse> {
    constructor(
        private readonly publisher: EventPublisher
    ) {}
    
    async execute(command: TranslateCommand): Promise<ITranslateResponse> {
        const response: ITranslateResponse = {
            text: 'Under construction'
        };

        return response;
    }
}