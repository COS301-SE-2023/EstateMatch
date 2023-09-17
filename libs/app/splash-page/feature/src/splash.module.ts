import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
// import { ProfileModule } from '@mp/app/profile/data-access';
import { SplashPage } from './splash.page';
import { SplashRouting } from './splash.routing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TranslationService } from './translation.service';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    SplashRouting, 
    FormsModule, 
    HttpClientModule
  ],
  declarations: [SplashPage],
  providers: [TranslationService],
})

export class SplashModule {}