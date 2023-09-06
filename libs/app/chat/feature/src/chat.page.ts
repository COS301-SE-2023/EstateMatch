import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { IProperty } from '@estate-match/api/properties/util';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ms-chat-page',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage {
  constructor(private http: HttpClient,
    private toastController: ToastController,
    private router: Router,
    private route: ActivatedRoute) { }

    userMessage = '';
    botMessage  = '';

    async sendChatMessage() {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      const chatUrl = 'api/setChat';

      

      const body = {
        chat: {
          username: localStorage.getItem('username'),
          message: this.userMessage
        }
      }

      const response = await this.http.post(chatUrl, body, { headers }).toPromise() as {chat: {username: string, message: string}};
      
      this.botMessage = response.chat.message;

    }
}