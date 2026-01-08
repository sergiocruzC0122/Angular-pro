import { Component, ElementRef, Host, HostBinding, input, output, signal, viewChild } from '@angular/core';

@Component({
  selector: 'calculator-button',
  imports: [],
  templateUrl: './calculator-button.html',
  styleUrls: ['./calculator-button.css'],
  host: {
    'class': 'w-1/4 border-r border-b border-indigo-400',
    '[class.w-2/4]': 'isDobleSize()',
    '[class.w-1/4]': '!isDobleSize()',
  }
})
export class CalculatorButton { 

  public isPressed = signal(false);

  public onClick = output<string>();
  public contentValue = viewChild<ElementRef<HTMLButtonElement>>('buttonContent');

  public isCommand = input(false, {
    transform: (value: boolean | string) =>
      typeof value === 'string' ? value === '' : value
  });

  public isDobleSize = input(false, {
    transform: (value: boolean | string) =>
      typeof value === 'string' ? value === '' : value
  });

  @HostBinding('class.is-command') get isCommandClass() {
    return this.isCommand();
  }

  @HostBinding('class.is-pressed') get isPressedClass() {
    return this.isPressed();
  }

  handleClick() {
    if (!this.contentValue()?.nativeElement) {
      return;
    }
    const content = this.contentValue()!.nativeElement.innerText;
    this.onClick.emit(content.trim());
  }

  public keyboardPressedStyle ( key: string ) {
    if (!this.contentValue()) return;

    const content = this.contentValue()!.nativeElement.innerText;

    if (content !== key) return;


    this.isPressed.set(true);

    setTimeout(() => {
      this.isPressed.set(false);
    }, 100);
  }
}
