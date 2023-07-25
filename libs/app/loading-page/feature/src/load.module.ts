import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
// import { ProfileModule } from '@mp/app/profile/data-access';
import { LoadPage } from './load.page';
import { LoadRouting } from './load.routing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    LoadRouting, 
    FormsModule, 
    HttpClientModule
  ],
  declarations: [LoadPage, HeaderComponent, FooterComponent],
})

export class LoadModule {}