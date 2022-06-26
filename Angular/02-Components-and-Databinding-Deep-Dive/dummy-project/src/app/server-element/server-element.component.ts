import {
    Component,
    Input,
    OnInit,
    ViewEncapsulation,
    OnChanges,
    SimpleChanges,
    DoCheck,
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit,
    AfterViewChecked,
    OnDestroy,
    ViewChild,
    ElementRef,
    ContentChild,
} from '@angular/core';

@Component({
    selector: 'app-server-element',
    templateUrl: './server-element.component.html',
    styleUrls: ['./server-element.component.css'],
    encapsulation: ViewEncapsulation.Emulated, // None, ShadowDom
})
export class ServerElementComponent
    implements
        OnInit,
        OnChanges,
        DoCheck,
        AfterContentInit,
        AfterContentChecked,
        AfterViewInit,
        AfterViewChecked,
        OnDestroy
{
    @Input() element: {
        type: string;
        name: string;
        content: string;
    };
    @Input() name: string;
    @ViewChild('heading') headerRef: ElementRef;
    @ContentChild('listContent') listRef: ElementRef;

    constructor() {
        console.log('constructor called!');
    }

    ngOnChanges(changes: SimpleChanges) {
        console.log(changes);
        console.log('ngOnChanges called!');
    }

    ngOnInit(): void {
        console.log('ngOnInit called!');
        console.log(this.headerRef.nativeElement.textContent);
        console.log(this.listRef.nativeElement.textContent);
    }

    ngDoCheck() {
        console.log('ngDoCheck called!');
    }

    ngAfterContentInit() {
        console.log('ngAfterContentInit called!');
        console.log(this.listRef.nativeElement.textContent);
    }

    ngAfterContentChecked() {
        console.log('ngAfterContentChecked called!');
    }

    ngAfterViewInit() {
        console.log('ngAfterViewInit called!');
        console.log(this.headerRef.nativeElement.textContent);
    }

    ngAfterViewChecked() {
        console.log('ngAfterViewChecked called!');
    }

    ngOnDestroy() {
        console.log('ngOnDestroy called!');
    }
}
