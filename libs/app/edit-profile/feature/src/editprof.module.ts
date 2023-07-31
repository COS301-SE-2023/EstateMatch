import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
// import { ProfileModule } from '@mp/app/profile/data-access';
import { EditProfilePage } from './editprof.page';
import { EditProfileRouting } from './editprof.routing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    EditProfileRouting, 
    FormsModule, 
    HttpClientModule
  ],
  declarations: [EditProfilePage],
})

export class EditProfileModule {}