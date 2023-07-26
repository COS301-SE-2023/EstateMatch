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

      require: any;

      map!:L.Map
      locationLat: number;
      locationLong: number;
      userLat: number;
      userLong: number;
      foundAddress: any;

      constructor() {
        this.locationLat=0;
        this.locationLong=0;
        this.userLat=0;
        this.userLong=0;
      }

      async ngOnInit() {
        const coordinates = await Geolocation.getCurrentPosition();

        this.setPropertyLocation();

        
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
        
       

        const reverseGeocodingUrl = 'https://api.geoapify.com/v1/geocode/reverse?lat='+e.latlng.lat+'&lon='+e.latlng.lng+'&apiKey=dcd92e44986d482085e39a946d3cebbb';

        this.reverseGeocode(reverseGeocodingUrl,e.latlng.lat,e.latlng.lng);

        
      });

      
      
    
  }

  setMarker(lat: any, long: any){
    const mark=L.marker([lat,long]).addTo(this.map);
    mark.bindPopup("<b>Selected Location. "+this.foundAddress.properties.formatted+"</b><br />").openPopup();
  }

  reverseGeocode(reverseGeocodeURL:any,lat: any, long: any){
    fetch(reverseGeocodeURL).then(result => result.json())
        .then(featureCollection => {
        if (featureCollection.features.length === 0) {
          console.log("The address is not found");
          return;
        }

        this.foundAddress = featureCollection.features[0];
        console.log("The address is: ", this.foundAddress.properties);
        console.log("The address is: ", this.foundAddress.properties.city);
        // const marker = L.marker(new L.LatLng(foundAddress.properties.lat, foundAddress.properties.lon)).addTo(this.map);
        this.setLatLong(lat,long);
        this.setMarker(lat,long)
        
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


  setPropertyLocation(){
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const fetch = this.require('node-fetch');
    const address = 'Baldersgade 3B, 2200 Copenhagen, Denmark';

    fetch(`https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(address)}&apiKey=dcd92e44986d482085e39a946d3cebbb`)
    .then((resp: { json: () => any; }) => resp.json())
    .then((geocodingResult: any) => {
      console.log(geocodingResult);
    });
      }

  

}


