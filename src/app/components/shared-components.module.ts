import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwipeItemComponent } from './swipe-item/swipe-item.component';



@NgModule({
  declarations: [
    SwipeItemComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SwipeItemComponent,
  ]
})
export class SharedComponentsModule { }
