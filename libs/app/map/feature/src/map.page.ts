import { Component, ViewChild } from '@angular/core';
import * as L from 'leaflet';
import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'ms-map-page',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
  export class MapPage {

      map!:L.Map

      // constructor() {
        
      // }

      async ngOnInit() {
        this.map=L.map('map',{
          center: [ 51.505, -0.09 ],
          zoom: 13,
          renderer: L.canvas()
        })

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: 'copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
      }).addTo(this.map);
      setTimeout(() => {
        this.map.invalidateSize();
      },0);

      const coordinates = await Geolocation.getCurrentPosition();

      console.log('Current position:', coordinates);
    
  }

}