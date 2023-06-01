import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InfoPage } from './info.page';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: InfoPage
    },   
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfoRouting {}