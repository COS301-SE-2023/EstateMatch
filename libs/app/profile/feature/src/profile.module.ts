import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
// import { ProfileModule } from '@mp/app/profile/data-access';
import { ProfilePage } from './profile.page';
import { ProfileRouting } from './profile.routing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ProfileRouting, 
    FormsModule, 
    HttpClientModule
  ],
  declarations: [ProfilePage],
})

export class ProfileModule {}