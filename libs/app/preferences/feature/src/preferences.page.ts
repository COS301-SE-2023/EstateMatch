import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastController } from '@ionic/angular';

import { IPreference } from '@estate-match/api/prefrences/util';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'ms-preferences-page',
  templateUrl: './preferences.page.html',
  styleUrls: ['./preferences.page.scss'],
})
export class PreferencesPage {
  constructor(private http: HttpClient,
    private toastController: ToastController,
    private route: ActivatedRoute,
    private router: Router) { }

    area = '';
    budget: any;
    bathrooms = 0;
    bedrooms = 0;
    garages = 0;
    ameneties :string[] = [];
    preference!: IPreference;

  ngOnInit() {

    this.route.queryParams.subscribe((params) => {
      this.area = params['data'];
      console.log(this.area);
    });

    // const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

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

    const lounge = document.getElementById('lounge');
    if(lounge)
      lounge.style.backgroundColor = '#E7604D';
  }
  

  async setPreferences() {
    const url = 'api/setPreferences';
    //const extras = this.extras.split(',');
    const body = {
      preferences:{
        user: sessionStorage.getItem('username'),
        location: this.area,
        budgetMin: parseInt(this.budget.lower),
        budgetMax: parseInt(this.budget.upper),
        bedrooms: (this.bedrooms),
        bathrooms: (this.bathrooms),
        garages: (this.garages),
        extras: this.ameneties       
      }
    }

    console.log(body);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    this.preference = await this.http.post(url, body, { headers }).toPromise() as IPreference;

    // this.http.post(url, body, { headers }).subscribe((response) => {
    //   console.log(response);
    // });

    

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
      if(pill.style.backgroundColor === 'rgb(231, 96, 77)'){
        pill.style.backgroundColor = '#67C390';
        this.ameneties.push(picked);
      }
      else{
        pill.style.backgroundColor = '#E7604D';
        this.ameneties = this.ameneties.filter(item => item !== picked);
      }
        
    }
  }

  openMap(){
    this.router.navigate(['/map'], {replaceUrl: true});
  }
}