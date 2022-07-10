import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter',
    pure: false, // performing issues
})
export class FilterPipe implements PipeTransform {
    transform(value: any[], filterString: string, propName: any): any {
        if (value.length === 0) {
            return value;
        }
        const resultArr = [];
        for (const item of value) {
            if (item[propName] === filterString) {
                resultArr.push(item);
            }
        }
        return resultArr;
    }
}
