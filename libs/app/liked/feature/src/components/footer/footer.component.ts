import { Component } from '@angular/core';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  templateUrl: 'footer.component.html',
  styleUrls: ['footer.component.scss'],
  providers: [TranslateService]
})
export class FooterComponent {
  constructor(
    private translate: TranslateService,
  ) {}

}