import {
    Directive,
    ElementRef,
    Renderer2,
    OnInit,
    HostListener,
    HostBinding,
    Input,
} from '@angular/core';

@Directive({
    selector: '[appBetterHighlight]',
})
export class BetterHighlightDirective implements OnInit {
    @Input() defaultColor = 'transparent';
    @Input() highlightColor = 'blue';
    @HostBinding('style.backgroundColor') backgroundColor = this.defaultColor;

    constructor(private elRef: ElementRef, private renderer: Renderer2) {}

    ngOnInit() {
        this.backgroundColor = this.defaultColor;
    }

    @HostListener('mouseenter') onMouseEnter(event: Event) {
        // this.renderer.setStyle(
        //     this.elRef.nativeElement,
        //     'background-color',
        //     'blue'
        // );
        this.backgroundColor = this.highlightColor;
    }

    @HostListener('mouseleave') onMouseLeave(event: Event) {
        // this.renderer.setStyle(
        //     this.elRef.nativeElement,
        //     'background-color',
        //     'transparent'
        // );
        this.backgroundColor = this.defaultColor;
    }
}
