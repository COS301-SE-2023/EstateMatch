import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'ms-info-page',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
  providers: [TranslateService]
})



export class InfoPage {
  constructor(private http: HttpClient,
    private toastController: ToastController,
    private router: Router,
    private route: ActivatedRoute, 
    private translate: TranslateService) {
      this.translate.setDefaultLang(sessionStorage.getItem('languagePref') || 'en');
    }
  images: string[] = [
    'https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/home-improvement/wp-content/uploads/2022/07/download-23.jpg',
    'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg',
    'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg'
  ];

  propertyDescription = 'Spacious 1 bedroom unit (50m2) in Harbour View, Woodstock - includes 1 secure covered parking bay! Freshly painted and new floor covering (wooden laminate). Great investment in popular well maintained and secure block. The unit is currently untenant and it is a perfect opportunity for AirBnB which is permitted in the building. This popular block has 24/7 security and concierge desk, a pool and built in braai deck with arguably the most stunning 360 degree views on offer in Cape Town. Walking distance to Old Biscuit Mill, restaurants, 6 minutes from town. The apartment consists of: A spacious bedroom with built in cupboards. Modern renovated bathroom. Large lounge with sliding doors onto balcony railing with mountain views. Open plan kitchen with built in stove/oven/hob, plumbing for 1 appliance. Breakfast counter. Octotel internet fibre ready. Electricity is on a pre-paid meter. Perfect for the first time buyer looking to get into the market or investor wanting to let or Airbnb. Currently tenanted at R8000 p/m. Do not miss this golden opportunity!'
  currentIndex = 0;
  property: any;
  chipTexts: string[] = [];
  firstColour: number[] = [];
  secondColour: number[] = [];
  thirdColour: number[] = [];
  fourthColour: number[] = [];
  fifthColour: number[] = [];
  

  async ngOnInit() {
    this.route.queryParams.subscribe(async params => {
      if(params['data'] != null){
        this.property = JSON.parse(params['data']);

        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
        });
        this.chipTexts = this.property.aiLabel;
        const prefLanguage = sessionStorage.getItem('languagePref');
        if(prefLanguage !== 'en'){
          const url = 'api/translate'
          const body = {
            text: '',
            targetLanguage: prefLanguage
          }

          for(let i = 0; i < 4; i++){
            body.text = this.property.aiLabel[i];
            const translated = await this.http.post(url, body, { headers: headers }).toPromise() as {text: string};
            console.log(translated.text);
            this.property.aiLabel[i] = translated.text;
          }      

          for(let i = 0; i < this.property.description.length; i++){
            body.text = this.property.description[i];
            const translated = await this.http.post(url, body, { headers: headers }).toPromise() as {text: string};
            this.property.description[i] = translated.text;
          }   

          for(let i = 0; i < this.property.amenities.length; i++){
            body.text = this.property.amenities[i];
            const translated = await this.http.post(url, body, { headers: headers }).toPromise() as {text: string};
            this.property.amenities[i] = translated.text;
          }          
        }


        const colours = this.property.rgbColour;

        const colourPalette = document.getElementsByClassName('colour-palate');

        colourPalette[0].setAttribute('style', 'background-color: rgb(' + colours[0] + ',' + colours[1] + ',' + colours[2] + ');');
        colourPalette[1].setAttribute('style', 'background-color: rgb(' + colours[3] + ',' + colours[4] + ',' + colours[5] + ');');
        colourPalette[2].setAttribute('style', 'background-color: rgb(' + colours[6] + ',' + colours[7] + ',' + colours[8] + ');');
        colourPalette[3].setAttribute('style', 'background-color: rgb(' + colours[9] + ',' + colours[10] + ',' + colours[11] + ');');
        colourPalette[4].setAttribute('style', 'background-color: rgb(' + colours[12] + ',' + colours[13] + ',' + colours[14] + ');');

        document.getElementById('container')?.setAttribute('style', 'display: block;');
      }
        this.router.navigate([], { queryParams: {} });
    });
  }

  async nextImage() {
    this.currentIndex++;
    if (this.currentIndex >= this.property.images.length) {
      this.currentIndex = 0;
    }
  }

  back(){
    this.router.navigate(['/home'], { replaceUrl: true });
  }
}