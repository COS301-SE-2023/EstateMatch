import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InfoPage } from './info.page';
import { HomePage } from '@estate-match/app/home/feature';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: InfoPage
    },
    {
      path: 'home',
      pathMatch: 'full',
      component: HomePage
  }    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfoRouting {}