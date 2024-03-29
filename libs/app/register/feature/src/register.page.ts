import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'ms-register-page',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  providers: [TranslateService]
})
export class RegisterPage {
  
  constructor(private http: HttpClient,
    private toastController: ToastController,
    private router: Router,
    private translate: TranslateService) {
      this.translate.setDefaultLang('en');
     }

    preferedLang = 'en';
    switchLanguage(lang: string) {
      this.translate.use(lang);
      this.preferedLang = lang;
    }
  
  username = '';
  email = '';
  fname = '';
  lname = '';
  password = '';
  cpassword = '';
  
  async register() {
    const url = 'api/register';
    if(this.password !== this.cpassword){
      this.makeToast('Passwords do not match');
    }else{
      const body = {
        username: this.username,
        password: this.password,
        email: this.email,
        firstName: this.fname,
        lastName: this.lname,
        languagePref: this.preferedLang,
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const registerResponse = await this.http.post(url, body, { headers }).toPromise() as {message: string};
    if(registerResponse.message === 'User Register Success'){
      this.makeToast('Register success');
      sessionStorage.setItem('username', this.username);
      sessionStorage.setItem('languagePref', this.preferedLang)
      this.router.navigate(['/preferences'], { replaceUrl: true });
    }else{
      this.makeToast('Register failed');
    }
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
  
  login(){
    this.router.navigate(['/login'], { replaceUrl: true });
  }
}