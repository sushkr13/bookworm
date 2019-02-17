import {Directive, Input, ElementRef, Renderer, OnInit} from "@angular/core";

@Directive({ selector: '[myFocus]' })
export class FocusDirective implements OnInit {
 
  @Input('myFocus') isFocused: boolean;
 
  constructor(private hostElement: ElementRef, private renderer: Renderer) {}
 
  ngOnInit() {
    if (this.isFocused) {
      this.renderer.invokeElementMethod(this.hostElement.nativeElement, 'focus');
    }
  }
}