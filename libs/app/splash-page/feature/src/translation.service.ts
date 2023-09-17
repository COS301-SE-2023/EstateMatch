// translation.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private translations: any; // Store translations

  constructor(private http: HttpClient) {}

  // Load the translation file
  loadTranslations(lang: string) {
    return this.http.get(`assets/${lang}.json`).toPromise().then(
      (data) => {
        this.translations = data;
      },
      (error) => {
        console.error('Error loading translations:', error);
      }
    );
  }
  

  // Get translation by key
  translate(key: string) {
    if (this.translations && this.translations[key]) {
      return this.translations[key];
    }
    return key; // Return the key itself if no translation is found
  }
}
