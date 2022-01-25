import { Directive, HostListener, Input, Renderer2 } from '@angular/core';
import { DomController, ScrollCustomEvent } from '@ionic/angular';

@Directive({
  selector: '[appHideHeader]'
})
export class HideHeaderDirective {
  @Input('appHideHeader') header: any;
  readonly maxLen = 100;

  constructor(private render: Renderer2, private domCrt: DomController) { }

  @HostListener('ionScroll', ['$event'])
  onScroll($event: ScrollCustomEvent) {
    const { scrollTop } = $event.detail;

    const opacityValue = Math.max(0, this.maxLen - scrollTop) / 100;
    const topValue = Math.min(this.maxLen, scrollTop);

    this.domCrt.write(() => {
      this.render.setStyle(this.header, 'opacity', opacityValue);
      this.render.setStyle(this.header, 'top', -topValue + 'px');
    });
  }

}
