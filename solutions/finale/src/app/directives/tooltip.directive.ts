import { Directive, ElementRef, inject, input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTooltip]',
  standalone: true,
  host: {
    '(mouseenter)': 'show()',
    '(mouseleave)': 'hide()'
  }
})
export class TooltipDirective {
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  tooltipText = input.required<string>({ alias: 'appTooltip' });
  private tooltip: HTMLElement | null = null;

  show() {
    this.tooltip = this.renderer.createElement('span');
    this.renderer.addClass(this.tooltip, 'tooltip');
    this.renderer.appendChild(this.tooltip, this.renderer.createText(this.tooltipText()));
    this.renderer.appendChild(this.el.nativeElement, this.tooltip);
  }

  hide() {
    if (this.tooltip) {
      this.renderer.removeChild(this.el.nativeElement, this.tooltip);
      this.tooltip = null;
    }
  }
}
