import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'ms-profile-page',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})

export class ProfilePage {
  constructor(private toastController: ToastController) {}

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