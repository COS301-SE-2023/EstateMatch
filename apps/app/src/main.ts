import { bootstrapApplication } from '@angular/platform-browser';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { CoreModule } from '@estate-match/app/core/feature';

// const ENVIRONMENT = 'production';

// if (ENVIRONMENT === 'production') {
//   enableProdMode();
// }

platformBrowserDynamic()
  .bootstrapModule(CoreModule)
  .catch((err) => console.error(err));