import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
// import { ProfileModule } from '@mp/app/profile/data-access';
import { HomePage } from './home.page';
import { HomeRouting } from './home.routing';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CarouselComponent } from './carousel/carousel.component';

@NgModule({
  imports: [CommonModule, IonicModule, HomeRouting, HttpClientModule],
  declarations: [HomePage, HeaderComponent, FooterComponent, CarouselComponent],
  exports: [HomePage],
})
export class HomeModule {}