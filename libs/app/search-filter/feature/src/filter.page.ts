import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { IProperty } from '@estate-match/api/properties/util';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ms-filter-page',
  templateUrl: './filter.page.html',
  styleUrls: ['./filter.page.scss'],
})
export class FilterPage {
  constructor(private http: HttpClient,
    private toastController: ToastController,
    private route: ActivatedRoute,
    private router: Router) { }

    location = ''; //Need to get from map
    minBudget = '';
    maxBudget = '';
    results: IProperty[] = [];
    bedrooms = 0;

    ngOnInit() {
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
    }

    async searchProperties(){
      const url = 'api/search';
      const body = {
        filters: {
          location: this.location,
          minBudget: parseInt(this.minBudget.replace(/\s/g, "")),
          maxBudget: parseInt(this.maxBudget.replace(/\s/g, "")),          
        }
      }

      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });

      this.results = await this.http.post(url, body, { headers }).toPromise() as IProperty[];
      const encodedData = JSON.stringify(this.results);
      this.router.navigate(['/search'], { queryParams: { data: encodedData}, replaceUrl: true});
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
          pill.style.backgroundColor = '#67C390'; //Selects
          //add to some array
        else
          pill.style.backgroundColor = '#E7604D'; //Deselects
          //remove from some array
      }
      
    }

    logVars(){
      console.log(this.location);
      console.log(this.minBudget);
      console.log(this.maxBudget);
      console.log(this.bedrooms);
    }
}