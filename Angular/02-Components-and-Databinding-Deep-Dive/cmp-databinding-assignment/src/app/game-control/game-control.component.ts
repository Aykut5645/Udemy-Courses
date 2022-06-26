import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-game-control',
    templateUrl: './game-control.component.html',
    styleUrls: ['./game-control.component.css'],
})
export class GameControlComponent implements OnInit {
    @Output() counterEvent = new EventEmitter<number>();
    intervalId: number;
    lastNumber = 1;
    constructor() {}

    ngOnInit(): void {}

    onStartGame() {
        this.intervalId = setInterval(() => {
            this.counterEvent.emit(this.lastNumber++);
        }, 1000);
    }

    onStopGame() {
        clearInterval(this.intervalId);
    }
}
