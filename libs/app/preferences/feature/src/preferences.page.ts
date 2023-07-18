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

  ngOnInit() {
    const pool = document.getElementById('pool');
    if(pool)
      pool.style.backgroundColor = '#E7604D';

    const pet = document.getElementById('pet');
    if(pet)
      pet.style.backgroundColor = '#E7604D';
    
    const study = document.getElementById('study');
    if(study)
      study.style.backgroundColor = '#E7604D';

    const aircon = document.getElementById('aircon');
    if(aircon)
      aircon.style.backgroundColor = '#E7604D';

    const furnished = document.getElementById('furnished');
    if(furnished)
      furnished.style.backgroundColor = '#E7604D';
  }
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
        user: sessionStorage.getItem('username'),
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

  async pick(picked: string){
    const pill = document.getElementById(picked);
    if(pill){
      if(pill.style.backgroundColor === 'rgb(231, 96, 77)')
        pill.style.backgroundColor = '#67C390';
      else
        pill.style.backgroundColor = '#E7604D';
    }
    
  }
}