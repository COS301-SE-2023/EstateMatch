import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'ms-change-page',
  templateUrl: './change.page.html',
  styleUrls: ['./change.page.scss'],
})

export class ChangePage {
  constructor(private http: HttpClient,
    private toastController: ToastController,
    private router: Router) { }

    async save() {
        return; 
    }
  }