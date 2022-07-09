import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

Injectable();
export class UserService {
    // activatedEmitter = new EventEmitter<boolean>(); => old approach
    activatedEmitter = new Subject<boolean>();
}
