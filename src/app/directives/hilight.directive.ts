import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHilight]'
})
export class HilightDirective {

  constructor(private ele:ElementRef) {
ele.nativeElement.style.backgroundColor = 'gray';
   }
@HostListener("mouseover") over(){
  this.ele.nativeElement.style.backgroundColor = 'pink';
}
@HostListener("mouseout") out(){
  this.ele.nativeElement.style.backgroundColor = 'gray';
}

}
