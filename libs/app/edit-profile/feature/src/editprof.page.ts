import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'ms-editprofile-page',
  templateUrl: './editprof.page.html',
  styleUrls: ['./editprof.page.scss'],
  providers: [TranslateService]
})

export class EditProfilePage {
  constructor(private http: HttpClient,
    private toastController: ToastController,
    private router: Router,
    private translate: TranslateService) {
      this.translate.setDefaultLang(sessionStorage.getItem('languagePref') || 'en');
     }

    switchLanguage(lang: string) {
      this.translate.use(lang);
    } 

    btnText = 'Edit Profile';
    isDisabled = true;
    
    newUsername = '';
    newEmail = '';
    newFName = '';
    newLName = '';
  
    ngOnInit() {
      if(!sessionStorage.getItem('username')){
        this.makeToast('Please login to continue');
        this.router.navigate(['/login'], { replaceUrl: true});
      }
    }

    async save() {
      if (this.btnText === 'Edit Profile') {
        this.btnText = 'Save Profile';
        this.isDisabled = false;

        const url = 'api/updateUser';
        const body = {
          username: sessionStorage.getItem('username'),
          newUserDetail: {
            username: sessionStorage.getItem('username'),
            email: this.newEmail,
            firstName: this.newFName,
            lastName: this.newLName
          }
        }

        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
        });

        const updated = await this.http.post(url, body, { headers }).toPromise() as {success: boolean};
        if(updated.success){
          this.makeToast('Profile succesfully updated');
          this.router.navigate(['/profile'], { replaceUrl: true });
        }else{
          this.makeToast('Profile update failed, please check that you are logged in');
        }

      } else {
        this.isDisabled = true;
        this.btnText = 'Edit Profile';
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