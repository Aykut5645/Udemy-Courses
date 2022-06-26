import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {
    oddNumbers: number[] = [];
    evenNumbers: number[] = [];

    onCounterEvent(counterNumber: number) {
        if (counterNumber % 2 === 0) {
            this.evenNumbers.push(counterNumber);
        } else {
            this.oddNumbers.push(counterNumber);
        }
    }
}
