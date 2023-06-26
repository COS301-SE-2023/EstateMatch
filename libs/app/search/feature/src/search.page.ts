import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'ms-search-page',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})

export class SearchPage {
  constructor(private http: HttpClient,
    private toastController: ToastController,
    private readonly router: Router) {}

    location = '';
    
    setFilters(data: string){
      this.router.navigate(['/filter'], { queryParams: { data: data }, replaceUrl: true});
    }
}