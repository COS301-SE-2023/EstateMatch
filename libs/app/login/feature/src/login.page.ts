import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { IPreference } from '@estate-match/api/prefrences/util';

@Component({
  selector: 'ms-login-page',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  constructor(private http: HttpClient,
    private toastController: ToastController,
    private router: Router) { }
  username = '';
  password = '';
  
  async login() {
    const url = 'api/login';
    const body = {
        username: this.username,
        password: this.password,
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const loggedIn = await this.http.post(url, body, { headers }).toPromise() as {message: string};
    if(loggedIn.message === 'User Login Success'){
      this.makeToast('Login success');
      sessionStorage.setItem('username', this.username);

      const getPrefURL = 'api/getPreferences';

      const prefBody = {
        user:{
          user: this.username,
        }
      }

      const userPref = await this.http.post(getPrefURL, prefBody, { headers }).toPromise() as IPreference;

      const remaxRentURL = 'api/RemaxRentScraper';

      const scraperBody = {
        location: userPref.location,
      };

      const remaxRent = await this.http.post(remaxRentURL, scraperBody, { headers });

      this.router.navigate(['/home'], { replaceUrl: true });
    }else{
      this.makeToast('Login failed');
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

  signup(){
    this.router.navigate(['/register'], { replaceUrl: true });
  }
}