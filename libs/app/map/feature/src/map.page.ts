import { AfterContentChecked, AfterViewInit, Component, ViewChild} from '@angular/core';
import * as L from 'leaflet';
import { Geolocation} from '@ionic-native/geolocation'
import { IGeocoder, GeocodingCallback, GeocodingResult } from './api';
import fetch from 'node-fetch';
import { ActivatedRoute, Router } from '@angular/router';
// import { google } from 'google-maps';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { url } from 'inspector';

@Component({
  selector: 'ms-map-page',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
  export class MapPage implements AfterViewInit {

      require: any;

      map!:L.Map
      locationLat: number;
      locationLong: number;
      userLat: number;
      userLong: number;
      foundAddress: any;
      propertyLat: number;
      propertyLong: number;
      selectedAddress: string;
      propertyLocation: any;
      
      

      constructor(private route: ActivatedRoute,
        private readonly router: Router,private http: HttpClient) {
        this.locationLat=0;
        this.locationLong=0;
        this.userLat=0;
        this.userLong=0;
        this.propertyLat=0;
        this.propertyLong=0;
        this.selectedAddress='';
      }

      async ngOnInit() {
        this.route.queryParams.subscribe(async (params) =>{
          if(params['data'] != null){
            this.propertyLocation = params['data'];
          }
            // this.router.navigate([], { queryParams: {} });
        });

        const coordinates = await Geolocation.getCurrentPosition();

        // this.setPropertyLocation('Baldersgade 3B, 2200 Copenhagen, Denmark');

        
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


      const customIcon = L.icon({
        iconUrl: 'assets/marker.png', 
        iconSize: [15,25]
      });

      const marker = L.marker([coordinates.coords.latitude, coordinates.coords.longitude],{
        icon: customIcon
      }).addTo(this.map);

 

      marker.bindPopup("<b>Your Current Location.</b><br />").openPopup();

      L.control.scale().addTo(this.map);


    


      this.map.once('click', (e) => {
        
       

        const reverseGeocodingUrl = 'https://api.geoapify.com/v1/geocode/reverse?lat='+e.latlng.lat+'&lon='+e.latlng.lng+'&apiKey=dcd92e44986d482085e39a946d3cebbb';

        this.reverseGeocode(reverseGeocodingUrl,e.latlng.lat,e.latlng.lng);

        
      });

      
      
    
  }

  async ngAfterViewInit(){
    console.log('Init');
    // const coords = await this.setPropertyLocation(this.propertyLocation);
    // // console.log(coords); 
    // this.setPropertyMarker(coords[0],coords[1]);
  }

  setSchoolMarker(lat: any, long: any, name: string){
    const customIcon = L.icon({
      iconUrl: 'assets/school.png', 
      iconSize: [35,35]
    });


    const mark=L.marker([lat,long],
      {
        icon: customIcon
      }).addTo(this.map);
    mark.bindPopup("<b>School: "+name+"</b><br />").openPopup();
  }


  setMarketMarker(lat: any, long: any, name: string){
    const customIcon = L.icon({
      iconUrl: 'assets/supermarket.png', 
      iconSize: [35,35]
    });


    const mark=L.marker([lat,long],
      {
        icon: customIcon
      }).addTo(this.map);
    mark.bindPopup("<b>Supermarket: "+name+" </b><br />").openPopup();
  }


  setGasstationMarker(lat: any, long: any, name: string){
    const customIcon = L.icon({
      iconUrl: 'assets/gas.png', 
      iconSize: [35,35]
    });


    const mark=L.marker([lat,long],
      {
        icon: customIcon
      }).addTo(this.map);
    mark.bindPopup("<b>Gas station: "+name+" </b><br />").openPopup();
  }


  setMallMarker(lat: any, long: any, name: string){
    const customIcon = L.icon({
      iconUrl: 'assets/mall.png', 
      iconSize: [35,35]
    });


    const mark=L.marker([lat,long],
      {
        icon: customIcon
      }).addTo(this.map);
    mark.bindPopup("<b>Mall: "+name+" </b><br />").openPopup();
  }


  setMarker(lat: any, long: any){
    const customIcon = L.icon({
      iconUrl: 'assets/marker.png', 
      iconSize: [15,25]
    });


    const mark=L.marker([lat,long],
      {
        icon: customIcon
      }).addTo(this.map);
    mark.bindPopup("<b>Selected Location: "+this.foundAddress.properties.formatted+"</b><br />").openPopup();
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
        this.selectedAddress = this.foundAddress.properties.city;
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


  async setPropertyLocation(address: any){
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const fetch = require('node-fetch');
    // const address = 'Baldersgade 3B, 2200 Copenhagen, Denmark';

    const response = await fetch(`https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(address)}&apiKey=0ddaaa18ee5f47b1b80e36cd0d3e0395`);
    const geocodingResult = await response.json();
    this.propertyLat = geocodingResult.features[0].geometry.coordinates[0];
    this.propertyLong = geocodingResult.features[0].geometry.coordinates[1];

    const url = 'api/getMap'

      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });

      let body = {
        longitude: this.propertyLat,
        latitude: this.propertyLong,
        type: 'school',
    }

    const schoolResponse = await this.http.post(url, body, { headers }).toPromise() as { results: any[] };

    for(let i = 0; i < schoolResponse.results.length; i++){
      this.setSchoolMarker(schoolResponse.results[i].geometry.location.lat,schoolResponse.results[i].geometry.location.lng,schoolResponse.results[i].name);
    }

    body = {
      longitude: this.propertyLat,
      latitude: this.propertyLong,
      type: 'supermarket',
    }

    const marketResponse = await this.http.post(url, body, { headers }).toPromise() as { results: any[] };

    for(let i = 0; i < marketResponse.results.length; i++){
      this.setMarketMarker(marketResponse.results[i].geometry.location.lat,marketResponse.results[i].geometry.location.lng,marketResponse.results[i].name);
    }

    body = {
      longitude: this.propertyLat,
      latitude: this.propertyLong,
      type: 'gas_station',
    }

    const gasResponse = await this.http.post(url, body, { headers }).toPromise() as { results: any[] };

    for(let i = 0; i < gasResponse.results.length; i++){
      this.setGasstationMarker(gasResponse.results[i].geometry.location.lat,gasResponse.results[i].geometry.location.lng,gasResponse.results[i].name);
    }

    body = {
      longitude: this.propertyLat,
      latitude: this.propertyLong,
      type: 'shopping_mall',
    }

    const mallResponse = await this.http.post(url, body, { headers }).toPromise() as { results: any[] };

    for(let i = 0; i < mallResponse.results.length; i++){
      this.setMallMarker(mallResponse.results[i].geometry.location.lat,mallResponse.results[i].geometry.location.lng,mallResponse.results[i].name);
    }
   
    return [this.propertyLat,this.propertyLong];
    
  }

  setPropertyMarker(lat: any, long: any){
    const customIcon = L.icon({
      iconUrl: 'assets/marker.png', 
      iconSize: [15,25]
    });


    const mark=L.marker([lat,long],
      {
        icon: customIcon
      }).addTo(this.map);
    mark.bindPopup("<b>Selected Location: "+this.propertyLocation+"</b><br />").openPopup();
  }

  confirmLocation(){
    this.router.navigate(['/preferences'], { queryParams:{data: this.selectedAddress}, replaceUrl: true});
  }  

}