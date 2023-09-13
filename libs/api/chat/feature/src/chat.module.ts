import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { CqrsModule } from '@nestjs/cqrs';
import { PreferenceModule as PreferenceDataAccess} from '@estate-match/api/prefrences/data-access';


import {
    StartChatHandler,
    SetChatHandler,
    UpdateChatHandler
} from './commands';

export const CommandHandlers = [
    StartChatHandler,
    SetChatHandler,
    UpdateChatHandler
];

@Module({
  imports: [CqrsModule, PreferenceDataAccess],
  providers: [ChatService, ...CommandHandlers],
  controllers: [ChatController],
  exports: [ChatService]
})
export class ChatModule {}