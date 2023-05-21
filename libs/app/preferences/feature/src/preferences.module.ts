import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
// import { ProfileModule } from '@mp/app/profile/data-access';
import { PreferencesPage } from './preferences.page';
import { PreferencesRouting } from './preferences.routing';

@NgModule({
  imports: [CommonModule, IonicModule, PreferencesRouting],
  declarations: [PreferencesPage],
})




export class PreferencesModule {}