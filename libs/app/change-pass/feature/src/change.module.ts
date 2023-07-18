import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
// import { ProfileModule } from '@mp/app/profile/data-access';
import { ChangePage } from './change.page';
import { ChangeRouting } from './change.routing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ChangeRouting, 
    FormsModule, 
    HttpClientModule
  ],
  declarations: [ChangePage],
})

export class ChangeModule {}