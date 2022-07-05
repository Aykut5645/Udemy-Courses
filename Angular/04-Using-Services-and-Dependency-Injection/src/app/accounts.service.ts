import { LoggingService } from './logging.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AccountsService {
    accounts = [
        {
            name: 'Master Account',
            status: 'active',
        },
        {
            name: 'Testaccount',
            status: 'inactive',
        },
        {
            name: 'Hidden Account',
            status: 'unknown',
        },
    ];

    constructor(private loggingService: LoggingService) {}

    addAccount(name: string, status: string): void {
        this.accounts.push({
            name,
            status,
        });
        this.loggingService.logStatusChange(status);
    }

    updateAccount(id: number, status: string): void {
        this.accounts[id].status = status;
        this.loggingService.logStatusChange(status);
    }
}
