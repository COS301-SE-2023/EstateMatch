
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreferencesPage } from './preferences.page';
import { HomePage } from '@estate-match/app/home/feature';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: PreferencesPage
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
export class PreferencesRouting {}