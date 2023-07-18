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

    ngOnInit() {
      this.route.queryParams.subscribe(params => {
        this.location = params['data'];
      });
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
        pill.style.backgroundColor = '#67C390';
      }
      
    }
}