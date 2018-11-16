import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appDelete]'
})


export class DeleteDirective {

  @HostListener('click') onclick() {
    this.alertThis();
  }

  private alertThis() {
    alert('it\'s working!! foo')
  }

  constructor(public element: ElementRef) {

   }

}
