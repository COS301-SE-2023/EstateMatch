import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
// import { ProfileModule } from '@mp/app/profile/data-access';
import { HomePage } from './home.page';
import { HomeRouting } from './home.routing';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { CardComponent } from './card/card.component';

@NgModule({
  imports: [CommonModule, IonicModule, HomeRouting, HttpClientModule,BrowserModule,
    BrowserAnimationsModule],
  declarations: [HomePage, HeaderComponent, FooterComponent, CardComponent],
  exports: [HomePage],
})
export class HomeModule {}