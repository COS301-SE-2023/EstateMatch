import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
// import { ProfileModule } from '@mp/app/profile/data-access';
import { FiltersPage } from './filters.page';
import { FiltersRouting } from './filters.routing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FiltersRouting, 
    FormsModule, 
    HttpClientModule
  ],
  declarations: [FiltersPage],
})

export class FiltersModule {}