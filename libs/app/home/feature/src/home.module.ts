import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
// import { ProfileModule } from '@mp/app/profile/data-access';
import { HomePage } from './home.page';
import { HomeRouting } from './home.routing';

@NgModule({
  imports: [CommonModule, IonicModule, HomeRouting],
  declarations: [HomePage],
})
export class HomeModule {}