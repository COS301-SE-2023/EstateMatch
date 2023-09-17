import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { IProperty } from '@estate-match/api/properties/util';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslationService } from './translation.service';

@Component({
  selector: 'ms-splash-page',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage {
  translationsLoaded = false; 
  constructor(public translationService: TranslationService) {}

  ngOnInit() {
    // Load translations for the selected language (e.g., 'af' for Afrikaans)
    this.translationService.loadTranslations('af')
      .then(() => {
        this.translationsLoaded = true;
      });
  }
}