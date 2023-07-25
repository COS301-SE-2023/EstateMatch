import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

// const redirectLoggedOut = () => redirectUnauthorizedTo(['']);
// const redirectLoggedIn = () => redirectLoggedInTo(['home']);

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
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
    path: 'profile',
    pathMatch: 'full',
    loadChildren: () =>
      import('@estate-match/app/profile/feature').then((m) => m.ProfileModule),
  },
  {
    path: 'editprof',
    pathMatch: 'full',
    loadChildren: () =>
      import('@estate-match/app/edit-profile/feature').then((m) => m.EditProfileModule),
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
  {
    path: 'map',
    pathMatch: 'full',
    loadChildren: () =>
      import('@estate-match/app/map/feature').then((m) => m.MapModule),
  },
  {
    path: 'info',
    pathMatch: 'full',
    loadChildren: () =>
      import('@estate-match/app/more-info/feature').then((m) => m.InfoModule),
  },
  {
    path: 'search',
    pathMatch: 'full',
    loadChildren: () =>
      import('@estate-match/app/search/feature').then((m) => m.SearchModule),
  },
  {
    path: 'filter',
    pathMatch: 'full',
    loadChildren: () =>
      import('@estate-match/app/search-filter/feature').then((m) => m.FilterModule),
  },
  {
    path: 'splash',
    pathMatch: 'full',
    loadChildren: () =>
      import('@estate-match/app/splash-page/feature').then((m) => m.SplashModule),
  },
  {
    path: 'load',
    pathMatch: 'full',
    loadChildren: () =>
      import('@estate-match/app/loading-page/feature').then((m) => m.LoadModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class CoreRouting {}
