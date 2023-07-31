import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { MapPage } from './map.page';
import { MapRouting } from './map.routing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    MapRouting, 
    FormsModule, 
    HttpClientModule
  ],
  declarations: [MapPage, HeaderComponent],
})

export class MapModule {}