import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { IPreference } from '@estate-match/api/prefrences/util';

import { IUser } from '@estate-match/api/users/util';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'ms-profile-page',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  providers: [TranslateService]
})
export class ProfilePage {
  constructor(
    private toastController: ToastController,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private translate: TranslateService) {
      this.translate.setDefaultLang('af');
     }

  user: IUser = {
    id: 'string',
    firstName: 'string',
    lastName: 'string',
    username: 'string',
    email: 'string',
    //password: 'string'
  };

  preferences: IPreference = {
    user: 'string',
    location: 'string', // Need to add location array on API side
    budgetMin: 1000000, // Need to add max on API side
    budgetMax: 10000000,
    bedrooms: 1,
    bathrooms: 2,
    garages: 3,
    extras: [],
  };

  logout() {
    sessionStorage.clear();
    this.makeToast('Logged out successfully');
  }

  async makeToast(message: any) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'top',
    });
    toast.present();
  }

  users!: IUser;

   async ngOnInit() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const profileUrl = 'api/getUser';
    const username = sessionStorage.getItem('username');
    const body = { user : username };
    if (username) {
      try {
        const response = await this.http.post(profileUrl, body, { headers }).toPromise();
        this.users = response as IUser;
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }

    this.user.firstName = this.users.firstName;
    this.user.lastName = this.users.lastName;
    this.user.username = this.users.username;
    this.user.email = this.users.email;
    //this.user.password = this.users.password;


    const prefUrl = 'api/getPreferences';
    const prefBody = { user : username };
    if (username) {
      try {
        const response = await this.http.post(prefUrl, prefBody, { headers }).toPromise();
        this.preferences = response as IPreference;
        console.log(this.preferences);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }

  }
}
