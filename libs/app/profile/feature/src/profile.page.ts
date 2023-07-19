import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { IPreference } from '@estate-match/api/prefrences/util';


@Component({
  selector: 'ms-profile-page',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})

export class ProfilePage {
  constructor(private toastController: ToastController) {}
  
  preferences: IPreference= {
    user: 'string',
    location: 'string', // Need to add location array on API side
    budget: 1000000, // Need to add max on API side
    bedrooms: 1,
    bathrooms: 1,
    garages: 1,
    extras: []
  };

  logout() {
    sessionStorage.clear();
    this.makeToast('Logged out successfully');
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