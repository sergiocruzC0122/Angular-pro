import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render router outlet', () => {
    const fixture = TestBed.createComponent(App);
    const compiled = fixture.nativeElement as HTMLElement;
    const routerOutlet = compiled.querySelector('router-outlet');
    expect(routerOutlet).toBeTruthy();
  });

  it('should render router-outlet with css classes', () => {
    const fixture = TestBed.createComponent(App);
    const compiled = fixture.nativeElement as HTMLElement;
    const divElement = compiled.querySelector('div');
    const mostHavedClasses = 'min-w-screen min-h-screen bg-slate-500 flex items-center justify-center px-5 py-5'.split(' ');
    mostHavedClasses.forEach(className => {
      expect(divElement?.classList).toContain(className);
    });
  });

  it('should render buy me a beer link', () => {
    const fixture = TestBed.createComponent(App);
    const compiled = fixture.nativeElement as HTMLElement;
    const linkElement = compiled.querySelector('a');
    expect(linkElement).toBeTruthy();
    expect(linkElement?.getAttribute('title')).toBe('Buy me a beer');
    expect(linkElement?.getAttribute('href')).toBe('https://www.buymeacoffee.com/scottwindon');
    expect(linkElement?.getAttribute('target')).toBe('_blank');
  });
});
