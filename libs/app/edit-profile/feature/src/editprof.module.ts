import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
// import { ProfileModule } from '@mp/app/profile/data-access';
import { EditProfilePage } from './editprof.page';
import { EditProfileRouting } from './editprof.routing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    EditProfileRouting, 
    FormsModule, 
    HttpClientModule
  ],
  declarations: [EditProfilePage, HeaderComponent, FooterComponent],
})

export class EditProfileModule {}