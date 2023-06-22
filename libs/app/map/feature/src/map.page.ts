import { Component, ViewChild } from '@angular/core';
// import {} from 'googlemaps';


@Component({
  selector: 'ms-map-page',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage {
  @ViewChild('map', { static: true }) mapElement: any;

  // constructor() {
  //   this.loadmap();
  // }

  // async loadmap() {
  //   const currentCords = await this.getCurrentLocation();
  //   const mapProperties = {
  //       center: new google.maps.LatLng(currentCords.latitude, currentCords.longitude),

  //   };
  // }
}