import { IMatchResponse, MatchCommand } from "@estate-match/api/matching/util";
import { CommandHandler, ICommandHandler, EventPublisher } from "@nestjs/cqrs";


@CommandHandler(MatchCommand)
export class MatchHandler implements ICommandHandler<MatchCommand> {
    constructor(private readonly eventPublisher: EventPublisher){} 

    async execute(command: MatchCommand): Promise<IMatchResponse> {
        const response: IMatchResponse = {
            matchScore: 0
        }
        return  response;
    }
}