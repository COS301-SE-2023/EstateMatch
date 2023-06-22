import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'ms-register-page',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  
  constructor(private http: HttpClient,
    private toastController: ToastController,
    private router: Router) { }
  username = '';
  email = '';
  fname = '';
  lname = '';
  password = '';
  cpassword = '';
  
  async register() {
    const url = 'api/register';
    const body = {
        username: this.username,
        password: this.password,
        email: this.email,
        firstName: this.fname,
        lastName: this.lname,
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const loggedIn = await this.http.post(url, body, { headers }).toPromise() as {message: string};
    if(loggedIn.message === 'User Login Success'){
      this.makeToast('Login success');
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
  
}