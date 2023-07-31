import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { LoginPage } from './login.page';
import { LoginRouting } from './login.routing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    LoginRouting, 
    FormsModule, 
    HttpClientModule
  ],
  declarations: [LoginPage, HeaderComponent],
})

export class LoginModule {}