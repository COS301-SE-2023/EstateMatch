import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { LikedPage } from './liked.page';
import { LikedRouting } from './liked.routing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component'
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    LikedRouting, 
    FormsModule, 
    HttpClientModule
  ],
  declarations: [LikedPage, HeaderComponent, FooterComponent],
})

export class LikedModule {}