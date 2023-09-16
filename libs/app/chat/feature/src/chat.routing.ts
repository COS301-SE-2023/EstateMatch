import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatPage } from './chat.page';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: ChatPage
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatRouting {}