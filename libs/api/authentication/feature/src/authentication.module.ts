import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PreferenceModule as PreferenceDataAccess} from '@estate-match/api/prefrences/data-access';
import { AuthController } from './authentication.controller';
import { AuthService } from './authentication.service';

// import {
//   GetPreferencesHandler,
//   SetPreferencesHandler,
// } from './commands';

// export const CommandHandlers = [
//   GetPreferencesHandler,
//   SetPreferencesHandler,
// ];

@Module({
  imports: [CqrsModule],
  providers: [AuthService,],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthenticationModule {}