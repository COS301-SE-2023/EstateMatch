import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { MapPage } from './map.page';
import { MapRouting } from './map.routing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Plugins } from '@capacitor/core';
import { NativeGeocoder, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { RouteReuseStrategy } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { statusbar } from '@ionic-native/status-bar/ngx';
import { IonicRouteStrategy } from '@ionic/angular';

const { Geolocation } = Plugins;

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    MapRouting, 
    FormsModule, 
    HttpClientModule
  ],
  declarations: [MapPage],
  providers: [
    statusbar,
    Geolocation,
    SplashScreen,
    NativeGeocoder,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
})

export class MapModule {}