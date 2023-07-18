import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
// import { ProfileModule } from '@mp/app/profile/data-access';
import { FilterPage } from './filter.page';
import { FilterRouting } from './filter.routing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FilterRouting, 
    FormsModule, 
    HttpClientModule
  ],
  declarations: [FilterPage, HeaderComponent],
})

export class FilterModule {}