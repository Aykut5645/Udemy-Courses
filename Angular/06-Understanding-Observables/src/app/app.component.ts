import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { UserService } from './user/user.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
    activated = false;
    activatedSubscription: Subscription;

    constructor(private userService: UserService) {}

    ngOnInit() {
        this.activatedSubscription = this.userService.activatedEmitter.subscribe((isActivated) => {
            this.activated = isActivated;
        });
    }

    ngOnDestroy() {
        this.activatedSubscription.unsubscribe();
    }
}
