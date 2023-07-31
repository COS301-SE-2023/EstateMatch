import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { LikedPage } from './liked.page';
import { IonicModule } from '@ionic/angular';

describe('LikedPage', () => {
    let component: LikedPage;
    let fixture: ComponentFixture<LikedPage>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [LikedPage],
            imports: [  IonicModule.forRoot(), FormsModule],
        }).compileComponents();

    });

    beforeEach(() => {
        fixture = TestBed.createComponent(LikedPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

});