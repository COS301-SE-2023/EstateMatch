import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Property {
  user: string;
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  amenities: string[];
  liked: boolean;
}

@Component({
  selector: 'ms-home-page',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})

export class HomePage {

  properties: Property[] = [
    {
      user: 'Jack Daniels',
      address: 'Ballito, KZN',
      price: 5000000,
      bedrooms: 3,
      bathrooms: 2,
      amenities: [],
      liked: false,
    },
    {
      user: 'Jack Daniels',
      address: 'Salt Rock, KZN',
      price: 10000000,
      bedrooms: 4,
      bathrooms: 3,
      amenities: ['Indoor Pool'],
      liked: false,
    },
    {
      user: 'Jack Daniels',
      address: 'Kyalami, Gauteng',
      price: 3000000,
      bedrooms: 2,
      bathrooms: 1,
      amenities: ['24hr Security'],
      liked: false,
    },
    {
      user: 'Jack Daniels',
      address: 'Vereeniging, Gauteng',
      price: 15000000,
      bedrooms: 3,
      bathrooms: 1,
      amenities: ['Pool'],
      liked: false,
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

  likeHouse() { 
    // if(this.currentDescriptionIndex == 0){
    //   console.log(this.properties[0]);
    // }else{
    //   console.log(this.properties[this.currentDescriptionIndex - 1]);
    // }

    const currProperty = this.properties[this.currentDescriptionIndex];
    currProperty.liked = true;
    console.log(this.properties[this.currentDescriptionIndex]);


    this.currentDescriptionIndex++;
    if (this.currentDescriptionIndex >= this.descriptions.length) {
      this.currentDescriptionIndex = 0;
    }
  }

  dislikeHouse() {
    const currProperty = this.properties[this.currentDescriptionIndex];
    currProperty.liked = false;
    console.log(this.properties[this.currentDescriptionIndex]);
    this.currentDescriptionIndex++;
    if (this.currentDescriptionIndex >= this.descriptions.length) {
      this.currentDescriptionIndex = 0;
    }
  }
}







