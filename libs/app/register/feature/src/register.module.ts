import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RegisterPage } from './register.page';
import { RegisterRouting } from './register.routing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RegisterRouting, 
    FormsModule, 
    HttpClientModule
  ],
  declarations: [RegisterPage, HeaderComponent],
})

export class RegisterModule {}