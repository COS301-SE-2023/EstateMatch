import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { ILikeProperty, IProperty } from '@estate-match/api/properties/util';
import { IPreference } from '@estate-match/api/prefrences/util';
import { Router } from '@angular/router';

interface Property {
  user: string;
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  amenities: string[];
  liked: boolean;
  image: string;
}

@Component({
  selector: 'ms-home-page',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})

export class HomePage {
  constructor(private http: HttpClient,
    private toastController: ToastController,
    private router: Router) {}


  // descriptions: string[] = ['R5 000 000. Three Bedroom and Two Bathrooms.',
  //  'R10 000 000. Four Bedroom and 3 Bathrooms. With an indoor pool.',
  //  'R3 000 000. 2 Bedroom house in a good neighbourhood. 24hr Security.',
  //   'R1 500 000.3 Bedroom and One bathroom, with a pool.'];
  images: string[] = [
    'https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/home-improvement/wp-content/uploads/2022/07/download-23.jpg',
    'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg',
    'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg'
  ];
  // area: string[] = ['Ballito, KZN', 'Salt Rock, KZN', 'Kyalami, Gauteng', 'Vereeniging, Gauteng']; 
  properties: IProperty[] = [{
    title: 'R5 000 000. Three Bedroom and Two Bathrooms.',
    location: 'Ballito, KZN',
    price: 100000,
    bedrooms: 1,
    bathrooms: 1,
    garages: 1,
    amenities: [],
    images: this.images,
  }];
  lastImageIndex = 0;
  currentDescriptionIndex = 0;
  
  userPreferences!: IPreference;

  async ngOnInit() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    //Get preferences
    const prefURL = 'api/getPreferences';
    const prefBody = {
      user: sessionStorage.getItem('username')
    }

    this.userPreferences = await this.http.post(prefURL, prefBody, { headers }).toPromise() as IPreference;
    console.log(this.userPreferences);
    //Search
    const url = 'api/search';
    const body = {
      filters: {
        location: this.userPreferences.location,
        minBudget: this.userPreferences.budget, 
        maxBudget: 100000000,      //Need to add max budget    
      }
    }

    this.properties = await this.http.post(url, body, { headers }).toPromise() as IProperty[];
    this.lastImageIndex = this.properties[0].images.length - 1;
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

  async moreInfo() {
    this.router.navigate(['/info'], { replaceUrl: true });
  }

}







