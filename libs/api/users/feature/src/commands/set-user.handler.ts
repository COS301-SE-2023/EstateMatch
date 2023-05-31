// import { UserRepository } from "@estate-match/api/users/data-access";
// import { UserModel } from "@estate-match/api/users/schema";
// //import { SetUserCommand, ISetUserResponse } from "@estate-match/api/users/util";
// import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

// @CommandHandler(/**SetUserCommand**/)
// export class SetUserHandler implements ICommandHandler</**SetUserCommand**/, /**ISetUserResponse**/> {
//     constructor(
//         private readonly repository: UserRepository,
//         private readonly publisher: EventPublisher
//     ) {}

//     async execute(command: /**SetUserCommand**/): Promise<any> {
//         const request = command.request;
//         const user = request.user; 
//         return this.repository.create(user); 
//     }
// }