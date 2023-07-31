import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
// import { ProfileModule } from '@mp/app/profile/data-access';
import { InfoPage } from './info.page';
import { InfoRouting } from './info.routing';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  imports: [CommonModule, IonicModule, InfoRouting, HttpClientModule, FormsModule],
  declarations: [InfoPage, HeaderComponent, FooterComponent],
  exports: [InfoPage],
})
export class InfoModule {}