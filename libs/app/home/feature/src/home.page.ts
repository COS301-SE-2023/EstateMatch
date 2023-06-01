import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastController } from '@ionic/angular';

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
    private toastController: ToastController) {}
  properties: Property[] = [
    {
      user: 'Jack Daniels',
      address: 'Ballito, KZN',
      price: 5000000,
      bedrooms: 3,
      bathrooms: 2,
      amenities: [],
      liked: false,
      image: 'https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/home-improvement/wp-content/uploads/2022/07/download-23.jpg',
    },
    {
      user: 'Jack Daniels',
      address: 'Salt Rock, KZN',
      price: 10000000,
      bedrooms: 4,
      bathrooms: 3,
      amenities: ['Indoor Pool'],
      liked: false,
      image: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      user: 'Jack Daniels',
      address: 'Kyalami, Gauteng',
      price: 3000000,
      bedrooms: 2,
      bathrooms: 1,
      amenities: ['24hr Security'],
      liked: false,
      image: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg',
    },
    {
      user: 'Jack Daniels',
      address: 'Vereeniging, Gauteng',
      price: 15000000,
      bedrooms: 3,
      bathrooms: 1,
      amenities: ['Pool'],
      liked: false,
      image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg',
    },
  ];
  descriptions: string[] = ['R5 000 000. Three Bedroom and Two Bathrooms.',
   'R10 000 000. Four Bedroom and 3 Bathrooms. With an indoor pool.',
   'R3 000 000. 2 Bedroom house in a good neighbourhood. 24hr Security.',
    'R1 500 000.3 Bedroom and One bathroom, with a pool.'];
  images: string[] = [
    'https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/home-improvement/wp-content/uploads/2022/07/download-23.jpg',
    'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg',
    'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg'
  ];
  area: string[] = ['Ballito, KZN', 'Salt Rock, KZN', 'Kyalami, Gauteng', 'Vereeniging, Gauteng']; 

  currentDescriptionIndex = 0;

  async likeHouse() { 
    const url = 'api/like';


    const currProperty = this.properties[this.currentDescriptionIndex];
    currProperty.liked = true;
    const body = {
      property: currProperty
    }
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.post(url, body, { headers }).subscribe((response) => {
      console.log('success');
    });
    await this.makeToast('Property Liked');
    console.log(this.properties[this.currentDescriptionIndex]);


    this.currentDescriptionIndex++;
    if (this.currentDescriptionIndex >= this.descriptions.length) {
      this.currentDescriptionIndex = 0;
    }
  }

  async dislikeHouse() {
    const url = 'api/dislike';
    const currProperty = this.properties[this.currentDescriptionIndex];
    currProperty.liked = false;
    const body = {
      property: currProperty
    }
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.post(url, body, { headers }).subscribe((response) => {
      console.log('success');
    });
    console.log(this.properties[this.currentDescriptionIndex]);
    await this.makeToast('Property Disliked');
    this.currentDescriptionIndex++;
    if (this.currentDescriptionIndex >= this.descriptions.length) {
      this.currentDescriptionIndex = 0;
    }
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
    
  }
}







