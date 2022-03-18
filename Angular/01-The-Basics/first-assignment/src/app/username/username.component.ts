import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-demo',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class UsernameComponent implements OnInit {
    username = '';
    constructor() { }

    ngOnInit(): void { }

    onClickRegister() {
        this.username = '';
    }
}