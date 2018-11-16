import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appDeleteIcon]'
})
export class DeleteIconDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
