import { ChangeDetectionStrategy, Component, computed, inject, viewChildren} from '@angular/core';
import { CalculatorButton } from "../calculator-button/calculator-button";
import { CalculatorService } from '../../services/calculator';

@Component({
  selector: 'calculator',
  imports: [
    CalculatorButton
  ],
  templateUrl: './calculator.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:keydown)': 'handleKeyBoardEvent($event)'
  }
})
export class Calculator { 

  private calculatorService = inject(CalculatorService);
  public calculatorButtons = viewChildren(CalculatorButton);

  public resultText = computed(() => this.calculatorService.resultText());
  public subResultText = computed(() => this.calculatorService.subResultText());
  public lastOperator = computed(() => this.calculatorService.lastOperator());

  handleClick (key: string) {
    console.log(key);
    
    this.calculatorService.constructNumber(key);
  }

  handleKeyBoardEvent(event: KeyboardEvent) {
    const key = event.key;
    
    const keyEquivalents: Record<string, string> = {
      'Enter': '=',
      'Escape': 'c',
      'Clear': 'c',
      '*': 'x',
      '/': '÷',
    };

    const mappedKey = keyEquivalents[key] ?? key;
    
    this.handleClick(mappedKey);
    this.calculatorButtons().forEach((button)=> {
      button.keyboardPressedStyle(mappedKey);
    });
  }
}
