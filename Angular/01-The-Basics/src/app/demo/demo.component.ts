import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-demo',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {
    showSecret = false;
    log = [];
    constructor() { }

    ngOnInit(): void {
    }

    onToggleDetails() {
        this.showSecret = !this.showSecret;
        this.log.push(new Date());
    };
}