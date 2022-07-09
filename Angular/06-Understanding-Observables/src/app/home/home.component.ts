import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription, Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
    // private firstSubscription: Subscription;
    private customSubscription: Subscription;

    constructor() {}

    ngOnInit() {
        // this.firstSubscription = interval(1000).subscribe((count) => {
        //     console.log(count);
        // });

        const customIntervalObservable = new Observable((subscriber) => {
            let count = 0;
            setInterval(() => {
                subscriber.next(count);
                if (count === 2) {
                    subscriber.complete();
                }
                if (count >= 5) {
                    subscriber.error(new Error('Counter greater than 5 is not permitted!'));
                }
                count++;
            }, 1000);
        });

        this.customSubscription = customIntervalObservable
            .pipe(
                filter((value: number) => {
                    return value % 2 === 0;
                }),
                map((x: number) => {
                    return 'Result: ' + x;
                })
            )
            .subscribe(
                (count) => {
                    console.log(count);
                },
                (error) => {
                    console.log('Error message: ', error.message);
                },
                () => {
                    console.log('It completed!');
                }
            );
    }

    ngOnDestroy() {
        // this.firstSubscription.unsubscribe();
        this.customSubscription.unsubscribe();
    }
}
