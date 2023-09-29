import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { IProperty } from '@estate-match/api/properties/util';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';


@Component({
  selector: 'ms-splash-page',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
  providers: [TranslateService]
})
export class SplashPage {
  constructor(
    private translate: TranslateService,
  ) {}

  switchLanguage(lang: string) {
    this.translate.use(lang);
  }
}