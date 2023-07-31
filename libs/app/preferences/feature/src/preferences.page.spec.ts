import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { PreferencesPage } from './preferences.page';
import { IonicModule, ToastController } from '@ionic/angular';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { IPreference } from '@estate-match/api/prefrences/util';

describe('PreferencesPage', () => {
    let component: PreferencesPage;
    let fixture: ComponentFixture<PreferencesPage>;
    let httpMock: HttpTestingController;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PreferencesPage],
            imports: [  IonicModule.forRoot(), FormsModule, HttpClientTestingModule],
            providers: [ToastController],
        }).compileComponents();

    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PreferencesPage);
        component = fixture.componentInstance;
        //fixture.detectChanges();
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should create', () => {
        expect( component instanceof PreferencesPage).toBe(true)

    });

});