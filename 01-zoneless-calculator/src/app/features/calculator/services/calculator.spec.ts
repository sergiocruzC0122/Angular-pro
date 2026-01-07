import { TestBed } from '@angular/core/testing';
import { CalculatorService } from './calculator';
import { vi } from 'vitest';

describe('CalculatorService', () => {

    let service: CalculatorService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(CalculatorService);
        vi.resetAllMocks();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should be created with default values', () => {
        expect(service.resultText()).toBe('0');
        expect(service.subResultText()).toBe('0');
        expect(service.lastOperator()).toBe('+');
    });

    it('should set resultText, subResultText to "0" when C or Delete is pressed', () => {
        service.resultText.set('123');
        service.subResultText.set('456');
        service.lastOperator.set('-');
        service.constructNumber('C');
        expect(service.resultText()).toBe('0');
        expect(service.subResultText()).toBe('0');
        expect(service.lastOperator()).toBe('+');
    });

    it('should update resultText with number input', () => {
        service.constructNumber('1');
        service.constructNumber('2');
        expect(service.resultText()).toBe('12');
    });

    it('should handle operators correctly', () => {
        const operators = ['+', '-', 'x', '÷', '*', '/'];
        operators.forEach(op => {
            service.resultText.set('50');
            service.constructNumber(op);
            expect(service.lastOperator()).toBe(op);
            expect(service.subResultText()).toBe('50');
            expect(service.resultText()).toBe('0');
        });
    });

    it('should calculate result correctly for addition', () => {
        service.constructNumber('2');
        service.constructNumber('+');
        service.constructNumber('3');
        service.constructNumber('=');
        expect(service.resultText()).toBe('5'); 
    });

    it('should calculate result correctly for subtraction', () => {
        service.constructNumber('5');
        service.constructNumber('-');
        service.constructNumber('2');
        service.constructNumber('=');
        expect(service.resultText()).toBe('3');
    });

    it('should calculate result correctly for multiplication', () => {
        service.constructNumber('4');
        service.constructNumber('x');
        service.constructNumber('3');
        service.constructNumber('=');
        expect(service.resultText()).toBe('12');
    });

    it('should calculate result correctly for division', () => {
        service.constructNumber('8');
        service.constructNumber('÷');
        service.constructNumber('2');
        service.constructNumber('=');
        expect(service.resultText()).toBe('4');
    });

    it('should handle decimal point correctly', () => {
        service.constructNumber('3');
        service.constructNumber('.');
        service.constructNumber('1');
        service.constructNumber('4');
        service.constructNumber('.');
        expect(service.resultText()).toBe('3.14');
        service.constructNumber('.');
        expect(service.resultText()).toBe('3.14');
    });

    it('should handle decimal point starting with 0', () => {
        service.constructNumber('.');
        service.constructNumber('.');
        service.constructNumber('5');
        service.constructNumber('.');
        expect(service.resultText()).toBe('0.5');
        service.constructNumber('.');
        expect(service.resultText()).toBe('0.5');
    });

    it('should handle sign change +/-', () => {
        service.constructNumber('5');
        service.constructNumber('+/-');
        expect(service.resultText()).toBe('-5');
        service.constructNumber('+/-');
        expect(service.resultText()).toBe('5');
    });

    it('should handle backspace', () => {
        service.resultText.set('123');
        service.constructNumber('Backspace');
        expect(service.resultText()).toBe('12');
        service.constructNumber('Backspace');
        expect(service.resultText()).toBe('1');
        service.constructNumber('Backspace');
        expect(service.resultText()).toBe('0');
        service.constructNumber('Backspace');
        expect(service.resultText()).toBe('0');
    });

    it('should handle backspace with negative numbers', () => {
        service.resultText.set('5');
        service.constructNumber('+/-');
        expect(service.resultText()).toBe('-5');
        service.constructNumber('Backspace');
        expect(service.resultText()).toBe('0');
    });

    it('should handle max length', () => {

        const consoleSpy = vi.spyOn(console, 'log');
        
        consoleSpy.mockImplementation(() => {});

        for(let i = 0; i < 20; i++) {
            service.constructNumber('1');
        }
        expect(service.resultText().length).toBe(10);
        expect(consoleSpy).toHaveBeenCalledTimes(10);
    });

    it('should handle invalid input', () => {
        const consoleSpy = vi.spyOn(console, 'log');
        service.resultText.set('100');
        service.constructNumber('ABC');
        expect(consoleSpy).toHaveBeenCalledWith('Invalid input', 'ABC');
    });
});