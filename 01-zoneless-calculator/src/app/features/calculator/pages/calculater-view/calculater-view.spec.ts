import { ComponentFixture, TestBed } from '@angular/core/testing';
import CalculaterView  from './calculater-view';
import { Component } from '@angular/core';

@Component({
  selector: 'calculator',
  template: `<div>MockCalculator</div>`,
})
class MockCalculator {}

describe('CalculaterView', () => {
  let component: CalculaterView;
  let fixture: ComponentFixture<CalculaterView>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CalculaterView],
    })
    .overrideComponent(CalculaterView, {
      set: {
        imports: [MockCalculator],
      },
    })
    .compileComponents();
    fixture = TestBed.createComponent(CalculaterView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should render calculator component', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('calculator')).toBeTruthy();
  });

  it('should cotain the specific CSS classes in the wapper div', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const wrapperDiv = compiled.querySelector('div');
    const expectedClasses = 'w-screen mx-auto rounded-xl bg-gray-100 shadow-xl text-gray-800 relative overflow-hidden'.split(' ');
    expectedClasses.forEach(className => {
      expect(wrapperDiv?.classList).toContain(className);
    });
  });

});