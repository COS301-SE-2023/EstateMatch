import { AfterViewInit, Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Gesture, GestureController, IonCard, Platform, ToastController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { ILikeProperty, IProperty } from '@estate-match/api/properties/util';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';


@Component({
  selector: 'ms-search-page',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
  providers: [TranslateService]
})

export class SearchPage implements AfterViewInit{

  @ViewChildren(IonCard, {read: ElementRef}) cards!: QueryList<ElementRef>;

  constructor(private http: HttpClient,
    private toastController: ToastController,
    private route: ActivatedRoute,
    private readonly router: Router,
    private gestureCtrl: GestureController,
    private translate: TranslateService) {
      this.translate.setDefaultLang(sessionStorage.getItem('languagePref') || 'en');
     }

    location = '';
    properties: IProperty[] = [{
      title: 'R5 000 000. Three Bedroom and Two Bathrooms.',
      location: 'Ballito, KZN',
      price: 100000,
      bedrooms: 1,
      bathrooms: 1,
      garages: 1,
      amenities: [],
      images: [],
      // //added user specific fields
      // userId: '001',
      // username: 'TestUsername',
       seen: false,
      aiLabel: [],
      rgbColour: [],
      description: ['This is a description of the property'],
      propertyURL: '',
      propertyType: '',
      // user: ['TestUsername']
    }
    ];
    
    lastImageIndex = 0;
    currentDescriptionIndex = 0;
    setFilters(data: string){
      this.properties = [];
      this.router.navigate(['/filter'], { queryParams: { data: data }, replaceUrl: true});
    }

    ngOnInit() {
      if(!sessionStorage.getItem('username')){
        this.makeToast('Please login to continue');
        this.router.navigate(['/login'], { replaceUrl: true});
      }
      this.route.queryParams.subscribe(params => {
        if(params['data'] != null){
          this.properties = JSON.parse(params['data']);
          document.getElementById('container')?.setAttribute('style', 'display: block;');
        }
          this.router.navigate([], { queryParams: {} });
      });
    }

    ngAfterViewInit(){
      const cardArray = this.cards.toArray();
      this.swipeEvent(cardArray);
    }

    async likeHouse() { 
      const url = 'api/like';
  
  
      const currProperty = this.properties[this.currentDescriptionIndex];
      const likedProperty: ILikeProperty = {
        user: sessionStorage.getItem('username')!,
        title: currProperty.title,
        address: currProperty.location,
        price: currProperty.price,
        bedrooms: currProperty.bedrooms,
        bathrooms: currProperty.bathrooms,
        garages: currProperty.garages,
        amenities: currProperty.amenities,
        liked: true,
        image: currProperty.images[0]
      };
      // currProperty.liked = true;
      const body = {
        property: likedProperty
      }
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      this.http.post(url, body, { headers }).subscribe((response) => {
        console.log('success');
      });
      await this.makeToast('Property Liked');
      console.log(this.properties[this.currentDescriptionIndex]);
  
  
      this.currentDescriptionIndex++;
      this.lastImageIndex = this.properties[this.currentDescriptionIndex].images.length - 1;
      // if (this.currentDescriptionIndex >= this.descriptions.length) {
      //   this.currentDescriptionIndex = 0;
      // }
    }
  
    async dislikeHouse() {
      const url = 'api/dislike';
      const currProperty = this.properties[this.currentDescriptionIndex];
      const dislikedProperty: ILikeProperty = {
        user: sessionStorage.getItem('username')!,
        title: currProperty.title,
        address: currProperty.location,
        price: currProperty.price,
        bedrooms: currProperty.bedrooms,
        bathrooms: currProperty.bathrooms,
        garages: currProperty.garages,
        amenities: currProperty.amenities,
        liked: true,
        image: currProperty.images[0]
      };
      const body = {
        property: dislikedProperty
      }
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      this.http.post(url, body, { headers }).subscribe((response) => {
        console.log('success');
      });
      console.log(this.properties[this.currentDescriptionIndex]);
      await this.makeToast('Property Disliked');
      this.currentDescriptionIndex++;
      this.lastImageIndex = this.properties[this.currentDescriptionIndex].images.length - 1;
  
      // if (this.currentDescriptionIndex >= this.descriptions.length) {
      //   this.currentDescriptionIndex = 0;
      // }
    }
  
    async makeToast(message: any){
      const toast = await this.toastController.create({
        message,
        duration: 2000,
        position: 'top',
      })
      toast.present();
    }

    async moreInfo() {
      this.router.navigate(['/info'], { replaceUrl: true });
    }

    async swipeEvent(cardArray: any) {
      for(let i = 0; i < cardArray.length; i++){
        console.log(cardArray[i]);
        const card = cardArray[i];
        const gesture: Gesture = this.gestureCtrl.create({
          el: card.nativeElement,
          gestureName: 'swipe',
          onMove: ev => {
            card.nativeElement.style.transform = `translateX(${ev.deltaX}px)`;
            // card.nativeElement.style.transform = `translateX(${ev.deltaX}px) rotate(${ev.deltaX / 10}deg)`;
          },
          onEnd: ev => {
            card.nativeElement.style.transition = '.5s ease-out';
            if(ev.deltaX > 150){
              this.makeToast('Property Liked')
              // card.nativeElement.style.transform = `translateX(${+this.plt.width() * 1.5}px) rotate(${ev.deltaX / 10}deg)`;
              this.likeHouse();
            }else if(ev.deltaX < -150){
              this.makeToast('Property Disliked')
              // card.nativeElement.style.transform = `translateX(-${+this.plt.width() * 1.5}px) rotate(${ev.deltaX / 10}deg)`;
              this.dislikeHouse();
            }
  
            card.nativeElement.style.transform = ''; 
          }
        });
  
        gesture.enable(true);
      }
    }
  
}