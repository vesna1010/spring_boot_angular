import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'toArray'
})
export class ToArrayPipe implements PipeTransform {

	transform(value: any, type: string): any[] {
		let array: any[] = Object.values(value);

		array = array.filter((val) => typeof val === type);

		return array;
	}

}