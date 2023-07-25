import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { ILikeProperty, IProperty } from '@estate-match/api/properties/util';


@Component({
  selector: 'ms-search-page',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})

export class SearchPage {
  constructor(private http: HttpClient,
    private toastController: ToastController,
    private route: ActivatedRoute,
    private readonly router: Router) {}

    location = '';
    properties: IProperty[] = [{
      title: 'R5 000 000. Three Bedroom and Two Bathrooms.',
      location: 'Ballito, KZN',
      price: 100000,
      bedrooms: 1,
      bathrooms: 1,
      garages: 1,
      amenities: [],
      images: []}
    ];
    
    lastImageIndex = 0;
    currentDescriptionIndex = 0;
    setFilters(data: string){
      this.properties = [];
      this.router.navigate(['/filter'], { queryParams: { data: data }, replaceUrl: true});
    }

    ngOnInit() {

      this.route.queryParams.subscribe(params => {
        if(params['data'] != null){
          this.properties = JSON.parse(params['data']);
          document.getElementById('container')?.setAttribute('style', 'display: block;');
        }
          this.router.navigate([], { queryParams: {} });
      });
    }

    async likeHouse() { 
      const url = 'api/like';
  
  
      const currProperty = this.properties[this.currentDescriptionIndex];
      const likedProperty: ILikeProperty = {
        user: sessionStorage.getItem('username')!,
        address: currProperty.location,
        price: currProperty.price,
        bedrooms: currProperty.bedrooms,
        bathrooms: currProperty.bathrooms,
        garages: currProperty.garages,
        amenities: currProperty.amenities,
        liked: true,
        image: currProperty.images[0]
      };
      // currProperty.liked = true;
      const body = {
        property: likedProperty
      }
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      this.http.post(url, body, { headers }).subscribe((response) => {
        console.log('success');
      });
      await this.makeToast('Property Liked');
      console.log(this.properties[this.currentDescriptionIndex]);
  
  
      this.currentDescriptionIndex++;
      this.lastImageIndex = this.properties[this.currentDescriptionIndex].images.length - 1;
      // if (this.currentDescriptionIndex >= this.descriptions.length) {
      //   this.currentDescriptionIndex = 0;
      // }
    }
  
    async dislikeHouse() {
      const url = 'api/dislike';
      const currProperty = this.properties[this.currentDescriptionIndex];
      const dislikedProperty: ILikeProperty = {
        user: sessionStorage.getItem('username')!,
        address: currProperty.location,
        price: currProperty.price,
        bedrooms: currProperty.bedrooms,
        bathrooms: currProperty.bathrooms,
        garages: currProperty.garages,
        amenities: currProperty.amenities,
        liked: true,
        image: currProperty.images[0]
      };
      const body = {
        property: dislikedProperty
      }
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      this.http.post(url, body, { headers }).subscribe((response) => {
        console.log('success');
      });
      console.log(this.properties[this.currentDescriptionIndex]);
      await this.makeToast('Property Disliked');
      this.currentDescriptionIndex++;
      this.lastImageIndex = this.properties[this.currentDescriptionIndex].images.length - 1;
  
      // if (this.currentDescriptionIndex >= this.descriptions.length) {
      //   this.currentDescriptionIndex = 0;
      // }
    }
  
    async makeToast(message: any){
      const toast = await this.toastController.create({
        message,
        duration: 2000,
        position: 'top',
      })
      toast.present();
    }
}