import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { HomePage } from './home.page';
import { HomeRouting } from './home.routing';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { FooterModule } from './components/footer/footer.module';

@NgModule({
  imports: [CommonModule, IonicModule, HomeRouting, HttpClientModule, FooterModule],
  declarations: [HomePage, HeaderComponent], // Remove FooterComponent from here
  exports: [HomePage],
})
export class HomeModule {}
