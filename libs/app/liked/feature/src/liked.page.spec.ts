import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { LikedPage } from './liked.page';
import { IonicModule, ToastController } from '@ionic/angular';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ILikeProperty } from '@estate-match/api/properties/util';

describe('LikedPage', () => {
    let component: LikedPage;
    let fixture: ComponentFixture<LikedPage>;
    let httpMock: HttpTestingController;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [LikedPage],
            imports: [  IonicModule.forRoot(), FormsModule, HttpClientTestingModule],
            providers: [ToastController],
        }).compileComponents();

    });

    beforeEach(() => {
        fixture = TestBed.createComponent(LikedPage);
        component = fixture.componentInstance;
        //fixture.detectChanges();
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should create', () => {
        expect( component instanceof LikedPage).toBe(true)

    });

    it('should fetch liked properties on initialization', () => {
        const mockLikedProperties : ILikeProperty[] = [
            {
                user: "user1",
                address: 'test',
                price: 1000,
                bedrooms: 1,
                bathrooms: 1,
                garages: 1,
                amenities: [],
                liked: true,
                image: 'test image',
            },
        ]

        component.ngOnInit();

        const req = httpMock.expectOne('api/getLikedProperties');
        expect(req.request.method).toBe('POST');



        req.flush(mockLikedProperties);

        expect(component.likedProperties).toEqual(mockLikedProperties);



    });



});