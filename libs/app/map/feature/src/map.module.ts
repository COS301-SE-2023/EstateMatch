import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { MapPage } from './map.page';
import { MapRouting } from './map.routing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Plugins } from '@capacitor/core';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

const { Geolocation } = Plugins;

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    MapRouting, 
    FormsModule, 
    HttpClientModule,
  ],
  declarations: [
    MapPage,
    HeaderComponent,
    FooterComponent,],
})

export class MapModule {}