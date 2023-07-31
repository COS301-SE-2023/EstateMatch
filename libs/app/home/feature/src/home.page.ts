import { AfterViewInit, Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Gesture, GestureController, IonCard, Platform, ToastController } from '@ionic/angular';
import { ILikeProperty, IProperty } from '@estate-match/api/properties/util';
import { IPreference } from '@estate-match/api/prefrences/util';
import { Router } from '@angular/router';

interface Property {
  user: string;
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  amenities: string[];
  liked: boolean;
  image: string;
}

@Component({
  selector: 'ms-home-page',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})

export class HomePage implements AfterViewInit{

  @ViewChildren(IonCard, {read: ElementRef}) cards!: QueryList<ElementRef>;
  @ViewChild('heartPicRef', { static: true }) heartPicRef!: ElementRef<HTMLDivElement>;
  @ViewChild('crossPicRef', { static: true }) crossPicRef!: ElementRef<HTMLDivElement>;

  constructor(private http: HttpClient,
    private toastController: ToastController,
    private router: Router,
    private gestureCtrl: GestureController,
    private plt: Platform) {}


  // descriptions: string[] = ['R5 000 000. Three Bedroom and Two Bathrooms.',
  //  'R10 000 000. Four Bedroom and 3 Bathrooms. With an indoor pool.',
  //  'R3 000 000. 2 Bedroom house in a good neighbourhood. 24hr Security.',
  //   'R1 500 000.3 Bedroom and One bathroom, with a pool.'];
  images: string[] = [
    'https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/home-improvement/wp-content/uploads/2022/07/download-23.jpg',
    'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg',
    'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg'
  ];
  // area: string[] = ['Ballito, KZN', 'Salt Rock, KZN', 'Kyalami, Gauteng', 'Vereeniging, Gauteng']; 
  properties: IProperty[] = [{
    title: 'R5 000 000. Three Bedroom and Two Bathrooms.',
    location: 'Ballito, KZN',
    price: 100000,
    bedrooms: 1,
    bathrooms: 1,
    garages: 1,
    amenities: [],
    images: this.images,
  }];
  lastImageIndex = 0;
  currentDescriptionIndex = 0;

  tempPower = 0;
  tempActive = false;

  userPreferences!: IPreference;

  temp: any = [];

 // showLikeIcon = false;
 // showCross = false; 

  async ngOnInit() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    //Get preferences
    const prefURL = 'api/getPreferences';
    const prefBody = {
      user: sessionStorage.getItem('username')
    }

    this.userPreferences = await this.http.post(prefURL, prefBody, { headers }).toPromise() as IPreference;
    //Search
    const url = 'api/search';
    const body = {
      filters: {
        location: this.userPreferences.location,
        minBudget: this.userPreferences.budget, 
        maxBudget: 100000000,      //Need to add max budget    
      }
    }

    this.properties = await this.http.post(url, body, { headers }).toPromise() as IProperty[];
    // this.properties = this.properties.slice(0,3);
    this.lastImageIndex = this.properties[0].images.length - 1;
    // this.ngAfterViewInit();
  }

  ngAfterViewInit(){
    const cardArray = this.cards.toArray();
    this.swipeEvent(cardArray);
  }

  showLikeIcon(newOpacity: number) {
    const divElement = this.heartPicRef.nativeElement;
    divElement.style.opacity = String(newOpacity); 
  }
  
  showCrossIcon(newOpacity: number) {
    const divElement = this.crossPicRef.nativeElement;
    divElement.style.opacity = String(newOpacity); 
  }

  delayedFunction() {
    console.log('Delayed function executed.');
  }

  async likeHouse() { 
    const url = 'api/like';
    const currProperty = this.properties[this.currentDescriptionIndex];
    const likedProperty: ILikeProperty = {
      user: sessionStorage.getItem('username')!,
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

    //showing the heart icon.
    this.showLikeIcon(1);

    await this.makeToast('Property Liked');

    setTimeout(() => {
      console.log("timer");
      this.showLikeIcon(0);
      }, 1000);

  // Set a timeout to hide the heart icon after 1 second (1000 milliseconds)


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

    this.showCrossIcon(1);

    await this.makeToast('Property Disliked');

    setTimeout(() => {
      console.log("timer");
      this.showCrossIcon(0);
      }, 1000);

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
    const encodedData = JSON.stringify(this.properties[this.currentDescriptionIndex]);
    this.router.navigate(['/info'], { queryParams: { data: encodedData}, replaceUrl: true});
  }

  async swipeEvent(cardArray: any) {
    for(let i = 0; i < cardArray.length; i++){
      console.log(cardArray[i]);
      const card = cardArray[i];
      const gesture: Gesture = this.gestureCtrl.create({
        el: card.nativeElement,
        gestureName: 'move',
        onStart: ev => {
          this.logStart();
        },
        onMove: ev => {
          card.nativeElement.style.transform = `translateX(${ev.deltaX}px)`;
          // card.nativeElement.style.transform = `translateX(${ev.deltaX}px) rotate(${ev.deltaX / 10}deg)`;
        },
        onEnd: ev => {
          this.logEnd();
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

  logStart() {
    console.log('Swipe started');
  }

  logEnd() {
    console.log('Swipe ended');
  }
}