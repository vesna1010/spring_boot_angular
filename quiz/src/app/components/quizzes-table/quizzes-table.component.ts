import { Component, OnInit } from '@angular/core';
import { QuizzesService } from 'src/app/services/quizzes.service';
import { IQuiz } from 'src/app/models/quiz';
import { ISort } from 'src/app/models/sort';

@Component({
	templateUrl: './quizzes-table.component.html'
})
export class QuizzesTableComponent implements OnInit {
	quizzes: IQuiz[];

	constructor(private quizzesService: QuizzesService) { }

	ngOnInit(): void {
		const sort: ISort = { sort: 'id' };

		this.quizzesService.findAllQuizzes(sort).subscribe(
			(response) => {
				this.quizzes = response.body;
			});
	}

	deleteQuizById(id: number): void {
		this.quizzesService.deleteQuizById(id).subscribe(
			() => {
				alert('Your Data Has Been Successfully Deleted.');
				this.ngOnInit();
			});
	}

}
