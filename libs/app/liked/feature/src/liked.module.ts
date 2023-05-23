import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { LikedPage } from './liked.page';
import { LikedRouting } from './liked.routing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    LikedRouting, 
    FormsModule, 
    HttpClientModule
  ],
  declarations: [LikedPage],
})

export class LikedModule {}