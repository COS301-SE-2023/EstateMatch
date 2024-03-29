import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { IProperty } from '@estate-match/api/properties/util';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'ms-filter-page',
  templateUrl: './filter.page.html',
  styleUrls: ['./filter.page.scss'],
  providers: [TranslateService]
})
export class FilterPage {
  constructor(private http: HttpClient,
    private toastController: ToastController,
    private route: ActivatedRoute,
    private router: Router,
    private translate: TranslateService) {
      this.translate.setDefaultLang(sessionStorage.getItem('languagePref') || 'en');
     }

    location = ''; //Need to get from map
    budget: any ;
    // budget = { Lower: '0', Upper: '0' }; 
    bedrooms = 0;
    bathrooms = 0;
    garages = 0;
    ameneities: string[] = [];
    results: IProperty[] = [];



    ngOnInit() {
      if(!sessionStorage.getItem('username')){
        this.makeToast('Please login to continue');
        this.router.navigate(['/login'], { replaceUrl: true});
      }
      this.route.queryParams.subscribe(params => {
        this.location = params['data'];
      });
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

    async searchProperties(){
      const url = 'api/search';
      const body = {
        filters: {
          location: this.location,
          budgetMin: this.budget.lower,
          budgetMax: this.budget.upper,
          bedrooms: this.bedrooms,
          bathrooms: this.bathrooms,
          garages: this.garages,
          ameneities: this.ameneities          
        }
      }

      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });

      this.results = await this.http.post(url, body, { headers }).toPromise() as IProperty[];
      if(this.results.length === 0){
        this.makeToast('No properties found that matches your search criteria');
        this.router.navigate(['/search'], { queryParams: { data: null}, replaceUrl: true});
      }else{
        const encodedData = JSON.stringify(this.results);
        this.router.navigate(['/search'], { queryParams: { data: encodedData}, replaceUrl: true});        
      }

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
          pill.style.backgroundColor = '#67C390'; //Selects
          this.ameneities.push(picked);          
        }
        else{
          pill.style.backgroundColor = '#E7604D'; //Deselects
          this.ameneities = this.ameneities.filter(item => item !== picked);
        }
      }    
    }
}