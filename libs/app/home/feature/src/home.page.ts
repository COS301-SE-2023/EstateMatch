import { Component } from '@angular/core';

@Component({
  selector: 'ms-home-page',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  descriptions: string[] = ['Three Bedroom and Two Bathrooms.',
   'Four Bedroom and 3 Bathrooms. With an indoor pool.',
   '2 Bedroom house in a good neighbourhood. 24hr Security.',
    '3 Bedroom and One bathroom, with a pool.'];
  images: string[] = [
    'https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/home-improvement/wp-content/uploads/2022/07/download-23.jpg',
    'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg',
    'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg'
  ];
  area: string[] = ['Ballito, KZN', 'Salt Rock, KZN', 'Kyalami, Gauteng', 'Vereeniging, Gauteng']; 

  currentDescriptionIndex: number = 0;

  likeHouse() {
    this.currentDescriptionIndex++;
    if (this.currentDescriptionIndex >= this.descriptions.length) {
      this.currentDescriptionIndex = 0;
    }
  }

  dislikeHouse() {
    this.currentDescriptionIndex++;
    if (this.currentDescriptionIndex >= this.descriptions.length) {
      this.currentDescriptionIndex = 0;
    }
  }
}







