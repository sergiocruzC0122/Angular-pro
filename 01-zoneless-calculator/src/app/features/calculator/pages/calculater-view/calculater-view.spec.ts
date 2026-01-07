import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalculaterView } from './calculater-view';

describe('CalculaterView', () => {

    let component: CalculaterView;
    let fixture: ComponentFixture<CalculaterView>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [CalculaterView],
        });
        fixture = TestBed.createComponent(CalculaterView);
        component = fixture.componentInstance
        fixture.detectChanges(); 
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});