import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[appHeroNameLength]',
  standalone: true,
})
export class HeroNameLengthDirective implements OnChanges {
  @Input('appHeroNameLength') heroName: string = '';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['heroName'] && this.heroName.length > 10) {
      this.renderer.addClass(this.el.nativeElement, 'highlighted-background');
      this.renderer.addClass(this.el.nativeElement, 'enlarged-text');
    } else {
      this.renderer.removeClass(
        this.el.nativeElement,
        'highlighted-background'
      );
      this.renderer.removeClass(this.el.nativeElement, 'enlarged-text');
    }
  }
}
