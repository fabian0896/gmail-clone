import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationController, GestureController, IonItem, Animation } from '@ionic/angular';
import { Mail } from 'src/app/models/mail.model';

@Component({
  selector: 'app-swipe-item',
  templateUrl: './swipe-item.component.html',
  styleUrls: ['./swipe-item.component.scss'],
})
export class SwipeItemComponent implements AfterViewInit {
  @ViewChild(IonItem, { read: ElementRef }) item: ElementRef;
  @ViewChild('wrapper') wrapper: ElementRef;
  @Input() mail: Mail;

  @Output() delete = new EventEmitter<boolean>();

  readonly animationBreckpoint = 100;
  deleteAnimation: Animation;

  constructor(
    private gestureCtr: GestureController,
    private router: Router,
    private animationCtr: AnimationController,
  ) {}

  ngAfterViewInit(): void {
    this.setupAnimation();
    const style = this.item.nativeElement.style;
    const gesture = this.gestureCtr.create({
      el: this.item.nativeElement,
      gestureName: 'move',
      threshold: 15,
      onStart: () => {
        style.transition = '';
      },
      onMove: (ev) => {
        this.item.nativeElement.classList.add('rounded');
        style.transform = `translate3d(${ev.deltaX}px, 0, 0)`;
        if (ev.deltaX > 0) {
          this.wrapper.nativeElement.style.background = 'var(--ion-color-danger)';
        } else if (ev.deltaX < 0) {
          this.wrapper.nativeElement.style.background = 'var(--ion-color-success)';
        }
        if (ev.deltaX > this.animationBreckpoint) {
          // console.log('Superamos un threshold');
        }
      },
      onEnd: (ev) => {
        this.item.nativeElement.classList.remove('rounded');
        style.transition = '.3s ease-out';
        if (ev.deltaX > this.animationBreckpoint) {
          console.log('Borrar el item');
          style.transform = `translate3d(${window.innerWidth}px, 0, 0)`;
          this.deleteAnimation.play();
          this.deleteAnimation.onFinish(() => {
            this.delete.emit();
          });
        } else {
          style.transform = 'translate3d(0, 0, 0)';
        }
      }
    }, true);
    gesture.enable();
  }

  setupAnimation() {
    this.deleteAnimation = this.animationCtr.create()
      .addElement(this.item.nativeElement)
      .duration(300)
      .fromTo('height', '89px', '0');
  }

  openDetails(id: string) {
    this.router.navigate(['tabs', 'mail', id]);
  }
}
