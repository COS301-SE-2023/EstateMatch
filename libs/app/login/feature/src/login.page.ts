import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';
import { IPreference } from '@estate-match/api/prefrences/util';
import { IUser } from '@estate-match/api/users/util';


@Component({
  selector: 'ms-login-page',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  providers: [TranslateService]
})
export class LoginPage {
  constructor(private http: HttpClient,
    private toastController: ToastController,
    private router: Router,
    private translate: TranslateService) {
      this.translate.setDefaultLang('en');
     }

    switchLanguage(lang: string) {
      this.translate.use(lang);
    }

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
        user: this.username,
      }

      const userUrl = 'api/getUser';
      const userBody = {
        user: this.username,
      }

      const user = await this.http.post(userUrl, userBody, { headers }).toPromise() as IUser;
      sessionStorage.setItem('languagePref', user.languagePref)
      const userPref = await this.http.post(getPrefURL, prefBody, { headers }).toPromise() as IPreference;

      const remaxRentURL = 'api/RemaxRentScraper'; //need to add rent/buy to preferences
      const remaxSaleURL = 'api/RemaxSaleScraper';
      const privatePropertyRentURL = 'api/PrivatePropertyRentScraper';
      const privatePropertySaleURL = 'api/PrivatePropertySaleScraper';

      const scraperBody = {
        username: this.username,
        location: userPref.location[0],
      };

      // const remaxRent = await this.http.post(remaxRentURL, scraperBody, { headers }).toPromise();
      // const remaxSale = await this.http.post(remaxSaleURL, scraperBody, { headers }).toPromise();
      // const privatePropertyRent = await this.http.post(privatePropertyRentURL, scraperBody, { headers });
      // const privatePropertySale = await this.http.post(privatePropertySaleURL, scraperBody, { headers }).toPromise();


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