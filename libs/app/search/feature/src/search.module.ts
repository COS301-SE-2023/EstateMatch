import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
// import { ProfileModule } from '@mp/app/profile/data-access';
import { SearchPage } from './search.page';
import { SearchRouting } from './search.routing';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';


@NgModule({
  imports: [CommonModule, IonicModule, SearchRouting, HttpClientModule],
  declarations: [SearchPage, HeaderComponent, FooterComponent],
  exports: [SearchPage],
})
export class SearchModule {}