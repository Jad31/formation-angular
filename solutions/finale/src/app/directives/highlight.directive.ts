import { Directive, ElementRef, inject, input } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true,
  host: {
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()'
  }
})
export class HighlightDirective {
  private el = inject(ElementRef);
  highlightColor = input<string>('#ffffa0');

  onMouseEnter() {
    this.el.nativeElement.style.backgroundColor = this.highlightColor();
  }

  onMouseLeave() {
    this.el.nativeElement.style.backgroundColor = '';
  }
}
