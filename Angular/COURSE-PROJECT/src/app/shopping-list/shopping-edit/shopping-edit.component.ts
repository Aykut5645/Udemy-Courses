import { Component, ElementRef, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';

@Component({
    selector: 'app-shopping-edit',
    templateUrl: './shopping-edit.component.html',
    styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit {
    @Output() addedIngredient = new EventEmitter<Ingredient>();

    @ViewChild('inputNameEl') inputNameRef: ElementRef;
    @ViewChild('inputAmountEl') inputAmountRef: ElementRef;

    constructor() {}

    ngOnInit() {}

    onClickAdd() {
        this.addedIngredient.emit(
            new Ingredient(this.inputNameRef.nativeElement.value, +this.inputAmountRef.nativeElement.value)
        );
    }
}
