import { Component, ViewChild} from '@angular/core';
import * as L from 'leaflet';
import { Geolocation} from '@ionic-native/geolocation'
import { IGeocoder, GeocodingCallback, GeocodingResult } from './api';


@Component({
  selector: 'ms-map-page',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
  export class MapPage {

      map!:L.Map
      locationLat: number;
      locationLong: number;
      userLat: number;
      userLong: number;

      constructor() {
        this.locationLat=0;
        this.locationLong=0;
        this.userLat=0;
        this.userLong=0;
      }

      async ngOnInit() {
        const coordinates = await Geolocation.getCurrentPosition();

        
        this.map=L.map('map',{
          center: [ 51.505, -0.09 ],
          zoom: 9,
          renderer: L.canvas()
        })

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: 'copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
      }).addTo(this.map);
      setTimeout(() => {
        this.map.invalidateSize();
      },0);

      this.map.panTo(new L.LatLng(coordinates.coords.latitude, coordinates.coords.longitude));

      this.userLat=coordinates.coords.latitude;
      this.userLong=coordinates.coords.longitude;

      const layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');

      this.map.addLayer(layer);

      const marker = L.marker([coordinates.coords.latitude, coordinates.coords.longitude]).addTo(this.map);

      marker.bindPopup("<b>Your Current Location.</b><br />").openPopup();

      L.control.scale().addTo(this.map);

      this.map.once('click', (e) => {
        this.setLatLong(e.latlng.lat, e.latlng.lng);
        const mark=L.marker([e.latlng.lat, e.latlng.lng]).addTo(this.map);
        mark.bindPopup("<b>Selected Location. Lattitude: "+e.latlng.lat+". Longtitude: "+e.latlng.lng+"</b><br />").openPopup();
      });

      const reverseGeocodingUrl = `https://api.geoapify.com/v1/geocode/reverse?lat=${coordinates.coords.latitude}&lon=${coordinates.coords.longitude}&apiKey=${'dcd92e44986d482085e39a946s3cebbb'}`;

      
    
  }



  setLatLong(lat: any, long: any) {
    this.locationLat = lat;
    this.locationLong = long;
  }

  async clear(){
    this.map.remove();
    this.ngOnInit();
  }

//   reverse(location: L.LatLngLiteral, scale: number, cb: GeocodingCallback, context?: any) {
//     try {
//       const code = this.options.OpenLocationCode.encode(
//         location.lat,
//         location.lng,
//         this.options.codeLength
//       );
//       const result = {
//         name: code,
//         center: L.latLng(location.lat, location.lng),
//         bbox: L.latLngBounds(
//           L.latLng(location.lat, location.lng),
//           L.latLng(location.lat, location.lng)
//         )
//       };
//       cb.call(context, [result]);
//     } catch (e) {
//       console.warn(e); // eslint-disable-line no-console
//       cb.call(context, []);
//     }
//   }
// }
  

}


