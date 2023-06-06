import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

// const redirectLoggedOut = () => redirectUnauthorizedTo(['']);
// const redirectLoggedIn = () => redirectLoggedInTo(['home']);

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'preferences',
    loadChildren: () =>
      import('@estate-match/app/home/feature').then((m) => m.HomeModule),
  },
  {
    path: 'preferences',
    pathMatch: 'full',
    loadChildren: () =>
      import('@estate-match/app/preferences/feature').then((m) => m.PreferencesModule),
  },
  {
    path: 'home',
    pathMatch: 'full',
    loadChildren: () =>
      import('@estate-match/app/home/feature').then((m) => m.HomeModule),
  },
  {
    path: 'liked',
    pathMatch: 'full',
    loadChildren: () =>
      import('@estate-match/app/liked/feature').then((m) => m.LikedModule),
  },
  {
    path: 'login',
    pathMatch: 'full',
    loadChildren: () =>
      import('@estate-match/app/login/feature').then((m) => m.LoginModule),
  },
  {
    path: 'register',
    pathMatch: 'full',
    loadChildren: () =>
      import('@estate-match/app/register/feature').then((m) => m.RegisterModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class CoreRouting {}
