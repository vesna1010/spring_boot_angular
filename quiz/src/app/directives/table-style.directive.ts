import { Directive, ElementRef } from '@angular/core';
import { wrappedError } from '@angular/core/src/error_handler';

@Directive({
	selector: 'table[tableStyle]'
})
export class TableStyleDirective {

	constructor(elementRef: ElementRef) {
		const tableElement: HTMLTableElement = elementRef.nativeElement;
		const wrapperElement: HTMLDivElement = document.createElement('div');

		tableElement.parentElement.insertBefore(wrapperElement, tableElement);
		wrapperElement.appendChild(tableElement);

		wrapperElement.classList.add('table-responsive');
		tableElement.classList.add('table', 'table-striped', 'table-bordered');
		tableElement.style.backgroundColor = '#C0C0C0';
	}

}