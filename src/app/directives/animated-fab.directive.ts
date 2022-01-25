import { Directive, HostListener, Input, OnInit } from '@angular/core';
import { AnimationController, ScrollCustomEvent, Animation } from '@ionic/angular';

@Directive({
  selector: '[appAnimatedFab]'
})
export class AnimatedFabDirective implements OnInit{
  @Input('appAnimatedFab') fab: any;
  expanded = true;
  shrinAnimation: Animation;

  constructor(private animationCtr: AnimationController) { }

  @HostListener('ionScroll', ['$event'])
  onScroll(event: ScrollCustomEvent) {
    const { deltaY } = event.detail;
    if (deltaY > 0 && this.expanded) {
      // down
      this.shrinkFab();
      this.expanded = false;
    } else if (deltaY < 0 && !this.expanded) {
      // up
      this.expandFab();
      this.expanded = true;
    }
  }

  ngOnInit(): void {
    this.setupAnimation();
  }

  setupAnimation() {

    const textSpan = this.fab.el.querySelector('span');

    const shrik = this.animationCtr.create('shrink')
      .addElement(this.fab.el)
      .duration(400)
      .fromTo('width', '140px', '50px');

      const fade = this.animationCtr.create('fade')
        .addElement(textSpan)
        .duration(400)
        .fromTo('opacity', 1, 0)
        .fromTo('width', '70px', '0px')
        .fromTo('margin-left', '10px', '0px');

      this.shrinAnimation = this.animationCtr.create('shrink-animation')
        .duration(400)
        .easing('ease-out')
        .addAnimation([shrik, fade]);
  }

  shrinkFab() {
    this.shrinAnimation.direction('alternate').play();
  }

  expandFab() {
    this.shrinAnimation.direction('reverse').play();
  }

}
