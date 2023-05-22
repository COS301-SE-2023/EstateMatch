import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
// import { ProfileModule } from '@mp/app/profile/data-access';
import { PreferencesPage } from './preferences.page';
import { PreferencesRouting } from './preferences.routing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    PreferencesRouting, 
    FormsModule, 
    HttpClientModule
  ],
  declarations: [PreferencesPage],
})

export class PreferencesModule {}