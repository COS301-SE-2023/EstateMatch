import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { HomePageComponent } from './home-page.components';

@NgModule({
  imports: [IonicModule, RouterModule.forChild([{ path: '', component: HomePageComponent }])],
  declarations: [HomePageComponent],
  exports: [HomePageComponent],
})
export class HomePageModule {}