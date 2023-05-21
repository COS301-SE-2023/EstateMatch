import { Component } from '@angular/core';

@Component({
  selector: 'ms-home-page',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  async LikeHouse(){
    alert('Dislike button clicked');
  }
  DislikeHouse(){
    alert('Dislike button clicked');
  }
  ngOnInit(){
    alert('Dislike button clicked');
  }
}

