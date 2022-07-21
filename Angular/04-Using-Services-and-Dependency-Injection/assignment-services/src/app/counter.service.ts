export class CounterService {
    activeToInactiveCounter = 0;
    inactiveToActiveCounter = 0;

    incrementActiveCounter() {
        this.activeToInactiveCounter++;
        console.log('Active to Inactive: ' + this.activeToInactiveCounter);
    }

    incrementInactiveCounter() {
        this.inactiveToActiveCounter++;
        console.log('Inactive to Active: ' + this.inactiveToActiveCounter);
    }
}
