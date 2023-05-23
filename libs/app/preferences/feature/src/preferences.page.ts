import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'ms-preferences-page',
  templateUrl: './preferences.page.html',
  styleUrls: ['./preferences.page.scss'],
})
export class PreferencesPage {
  constructor(private http: HttpClient,
    private toastController: ToastController) { }
  area = '';
  budget = '';
  bathrooms = '';
  bedrooms = '';
  garages = '';
  extras = '';

  async setPreferences() {
    const url = 'api/setPreferences';
    const extras = this.extras.split(',');
    const body = {
      preferences:{
        user: 'Jack Daniels',
        location: this.area,
        budget: parseInt(this.budget.replace(/\s/g, "")),
        bedrooms: parseInt(this.bedrooms),
        bathrooms: parseInt(this.bathrooms),
        garages: parseInt(this.garages),
        extras: extras       
      }
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    this.http.post(url, body, { headers }).subscribe((response) => {
      console.log(response);
    });

    

    this.makeToast('Your initial prefrences set!');
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