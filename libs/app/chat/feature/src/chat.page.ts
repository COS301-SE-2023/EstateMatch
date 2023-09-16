import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ms-chat-page',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage {
  constructor(
    private http: HttpClient,
    private toastController: ToastController,
    private route: ActivatedRoute
  ) {}

  userMessage = '';
  messages: { text: string; time: string; userType: 'user' | 'bot' }[] = [];
  
  async ngOnInit(){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = 'api/startChat';

    const body = {
      username: sessionStorage.getItem('username')
    }

    const response = await this.http.post(url, body, { headers }).toPromise() as { message: string };

    this.messages.push({
      text: response.message,
      time: this.getCurrentTime(),
      userType: 'bot',
    });
  }

  async sendChatMessage() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const chatUrl = 'api/setChat';

    const body = {
      chat: {
        username: sessionStorage.getItem('username'),
        message: this.userMessage,
      },
    };

    this.messages.push({
      text: this.userMessage,
      time: this.getCurrentTime(),
      userType: 'user',
    });
    this.userMessage = '';

    const response = await this.http
      .post(chatUrl, body, { headers })
      .toPromise() as { chat: { username: string; message: string } };

    this.messages.push({
      text: response.chat.message,
      time: this.getCurrentTime(),
      userType: 'bot',
    });


  }

  getCurrentTime(): string {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }
}
