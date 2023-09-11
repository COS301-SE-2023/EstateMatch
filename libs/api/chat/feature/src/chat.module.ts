import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { CqrsModule } from '@nestjs/cqrs';
// import { ChatModule as UserDataAccessModule } from '@estate-match/api/chat/data-access';

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
  imports: [CqrsModule],
  providers: [ChatService, ...CommandHandlers],
  controllers: [ChatController],
  exports: [ChatService]
})
export class ChatModule {}