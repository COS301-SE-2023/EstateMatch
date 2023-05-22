import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
// import { ProfileModule } from '@mp/app/profile/data-access';
import { PreferencesPage } from './preferences.page';
import { PreferencesRouting } from './preferences.routing';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [CommonModule, IonicModule, PreferencesRouting, FormsModule,ReactiveFormsModule],
  declarations: [PreferencesPage],
})




export class PreferencesModule {}