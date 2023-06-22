import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'ms-editprofile-page',
  templateUrl: './editprof.page.html',
  styleUrls: ['./editprof.page.scss'],
})

export class EditProfilePage implements OnInit {

    btnText = 'Edit Profile';
    isDisabled = true;
    constructor() { }
  
    ngOnInit() {
    }
  
    save() {
      if (this.btnText === 'Edit Profile') {
        this.btnText = 'Save Profile';
        this.isDisabled = false;
      } else {
        this.isDisabled = true;
        this.btnText = 'Edit Profile';
      }
    }
  
  }