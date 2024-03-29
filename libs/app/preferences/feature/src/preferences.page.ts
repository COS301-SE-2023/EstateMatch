import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoadingController, ToastController } from '@ionic/angular';

import { IPreference } from '@estate-match/api/prefrences/util';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';
import { fail } from 'assert';

@Component({
  selector: 'ms-preferences-page',
  templateUrl: './preferences.page.html',
  styleUrls: ['./preferences.page.scss'],
  providers: [TranslateService]
})
export class PreferencesPage {
  constructor(private http: HttpClient,
    private toastController: ToastController,
    private route: ActivatedRoute,
    private router: Router,
    private loadingController: LoadingController,
    private translate: TranslateService) {
      this.translate.setDefaultLang(sessionStorage.getItem('languagePref') || 'en');
     }

    area = '';
    budget: any;
    bathrooms = 0;
    bedrooms = 0;
    garages = 0;
    type = '';
    ameneties :string[] = [];
    preference!: IPreference;
    selectedAreas: string[] = [];

  ngOnInit() {
    if(!sessionStorage.getItem('username')){
      this.makeToast('Please login to continue');
      this.router.navigate(['/login'], { replaceUrl: true});
    }
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
  
  addSelectedArea() {
    if (this.area) {
      this.selectedAreas.push(this.area); // Add the area to the selectedAreas array
      this.area = ''; // Clear the input field
    }
  }

  removeSelectedArea(selectedArea: string) {
    this.selectedAreas = this.selectedAreas.filter((area) => area !== selectedArea); // Remove the selected area
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
        extras: this.ameneties,
        type: this.type,       
      }
    }

    console.log(body);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    this.preference = await this.http.post(url, body, { headers }).toPromise() as IPreference;
    
    try{
      await this.showLoading();
      const newProperties = await this.propertyCheck(this.area, this.type);
    }finally{
      await this.hideLoading();
    }
    
  

    this.makeToast('Your prefrences are updated!');
    this.router.navigate(['/home'], {replaceUrl: true});
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
    this.router.navigate(['/map'], { queryParams: { data: null }, replaceUrl: true});
  }

  async propertyCheck(location: string, rentBuyPref: string){
    const url = 'api/propertyCheck';
    const username = sessionStorage.getItem('username');
    const body = {
      user: username,
    }
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    // const newPropertiesNeeded = await this.http.post(url, body, { headers }).toPromise() as {empty: boolean};

      //Somehow check if new user or not
      if (username) {
        let scrapeUrl = '';
        if(rentBuyPref === 'Rent'){
          scrapeUrl = 'api/PrivatePropertyRentScraper';
        }else{
          scrapeUrl = 'api/PrivatePropertySaleScraper';
        }
    
        const scraperBody = {
          username: sessionStorage.getItem('username'),
          location: location,
        };
    
        const privatePropertySale = await this.http.post(scrapeUrl, scraperBody, { headers }).toPromise();
      }

      return true;
  }
  private loading!: HTMLIonLoadingElement;
  async showLoading() {
    this.loading = await this.loadingController.create({
      message: 'Please wait while we are finding potential matches...', // You can customize the loading message
      spinner: 'dots', // Use the 'dots' spinner
      translucent: true,
      backdropDismiss: false, // Prevent dismissing by tapping outside
      cssClass: 'custom-loading-class' // You can define a custom CSS class for styling
    });
    await this.loading.present();
  }
  
  async hideLoading() {
    if (this.loading) {
      await this.loading.dismiss();
    }
  }
}