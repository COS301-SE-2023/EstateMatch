
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreferencesPage } from './preferences.page';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: PreferencesPage
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PreferencesRouting {}