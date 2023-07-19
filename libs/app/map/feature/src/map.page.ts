import { Component, ViewChild} from '@angular/core';
import * as L from 'leaflet';
import { Geolocation} from '@ionic-native/geolocation'


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

      geocoderOptions: NativeGeocoderOptions = {
        useLocale: true,
        maxResults: 5
      };

      constructor(private locationAccuracy: LocationAccuracy, private nativeGeocoder: NativeGeocoder) {
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

      
    
  }



  setLatLong(lat: any, long: any) {
    this.locationLat = lat;
    this.locationLong = long;
  }

  async clear(){
    this.map.remove();
    this.ngOnInit();
  }
  

}


