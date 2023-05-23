import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { IProperty } from '@estate-match/api/properties/util';

@Component({
  selector: 'ms-liked-page',
  templateUrl: './liked.page.html',
  styleUrls: ['./liked.page.scss'],
})
export class LikedPage {
  constructor(private http: HttpClient,
    private toastController: ToastController) { }

  likedProperties: IProperty[] = [];
  async ngOnInit() {
    const url = 'api/getLikedProperties';
    const body = {
      user: 'Jack Daniels'
    }

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.likedProperties = await this.http.post(url, body, { headers }).toPromise() as IProperty[];

    console.log(this.likedProperties);
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