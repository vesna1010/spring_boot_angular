import { Component, OnInit, Input } from '@angular/core';
import { IPage } from 'src/app/models/page';

@Component({
	selector: 'pagination',
	templateUrl: './pagination.component.html'
})
export class PaginationComponent implements OnInit {
	@Input() page: IPage<any>;
	@Input() url: string;
	numbers: number[];

	ngOnInit(): void {
		this.numbers = [];

		for (let i = this.page.number - 2; i <= this.page.number + 2; i++) {
			this.numbers.push(i);
		}

		while (this.numbers[0] < 0) {
			this.numbers.shift();
		}

		while (this.numbers[this.numbers.length - 1] >= this.page.totalPages) {
			this.numbers.pop();
		}

		while (this.numbers.length < 5 && this.numbers[0] > 0) {
			this.numbers.unshift(this.numbers[0] - 1);
		}

		while (this.numbers.length < 5 && this.numbers[this.numbers.length - 1] < this.page.totalPages - 1) {
			this.numbers.push(this.numbers[this.numbers.length - 1] + 1);
		}
	}
	
}