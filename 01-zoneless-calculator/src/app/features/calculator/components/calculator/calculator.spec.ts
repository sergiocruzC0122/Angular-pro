import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Calculator } from './calculator';
import { signal } from '@angular/core';
import { CalculatorService } from '../../services/calculator';
import { CalculatorButton } from '../calculator-button/calculator-button';
import { By } from '@angular/platform-browser';

class MockCalculatorService {
  resultText = signal('100');
  subResultText = signal('20');
  lastOperator = signal('-');
  constructNumber = vi.fn();
}

describe('Calculator', () => {
    let component: Calculator;
    let fixture: ComponentFixture<Calculator>;
    let mockCalculatorService: MockCalculatorService;

    beforeEach(() => {
        mockCalculatorService = new MockCalculatorService();

        TestBed.configureTestingModule({
        imports: [Calculator],
        providers: [
            {
            provide: CalculatorService,
            useValue: mockCalculatorService,
            },
        ],
        });

        fixture = TestBed.createComponent(Calculator);
        component = fixture.componentInstance;
        fixture.detectChanges(); // Importante
    });

    it('should create', () => {
        // const compiled = fixture.nativeElement as HTMLElement;
        // // console.log(compiled.innerHTML);
        // console.log({
        //   resultText: component.resultText(),
        //   subResultText: component.subResultText(),
        //   lastOperator: component.lastOperator(),
        // });

        expect(component).toBeTruthy();
    });

    it('should have initial values from service', () => {
        expect(component.resultText()).toBe('100');
        expect(component.subResultText()).toBe('20');
        expect(component.lastOperator()).toBe('-');
    });

    it('should display values in the template', () => {
        mockCalculatorService.resultText.set('50');
        mockCalculatorService.subResultText.set('10');
        mockCalculatorService.lastOperator.set('-');
        fixture.detectChanges();

        const compiled = fixture.nativeElement as HTMLElement;

        const resultTextElement = compiled.querySelector('[test-id="result-text"]');
        const subResultTextElement = compiled.querySelector('.text-4xl');

        expect(resultTextElement?.innerHTML).toBe('50');
        expect(subResultTextElement?.innerHTML).toContain('10 - ');
    });

    it('should call constructNumber when handleClick is called', () => {
        component.handleClick('5');
        expect(mockCalculatorService.constructNumber).toHaveBeenCalled();
        expect(mockCalculatorService.constructNumber).toHaveBeenCalledWith('5');
    });

    it('should call constructNumber when button is clicked', () => {
        // todo:
        const buttons = fixture.debugElement.queryAll(
        By.directive(CalculatorButton)
        );

        const button = buttons[0];
        button.triggerEventHandler('onClick', 'C');

        expect(buttons.length).toBe(19);
        expect(mockCalculatorService.constructNumber).toHaveBeenCalledWith('C');
    });

    it('should update resultText signal when service updates', () => {
        mockCalculatorService.resultText.set('999');
        fixture.detectChanges();

        expect(component.resultText()).toBe('999');
    });

    it('should have 19 calculator-button components with content projected', () => {
        const compiled = fixture.nativeElement as HTMLElement;

        const buttons = compiled.querySelectorAll('calculator-button');

        expect(buttons.length).toBe(19);

        expect(buttons[0].querySelector('button')?.innerHTML).toContain('C');
        expect(buttons[1].querySelector('button')?.innerHTML).toContain('+/-');
        expect(buttons[2].querySelector('button')?.innerHTML).toContain('%');
        expect(buttons[3].querySelector('button')?.innerHTML).toContain('÷');
    });
});