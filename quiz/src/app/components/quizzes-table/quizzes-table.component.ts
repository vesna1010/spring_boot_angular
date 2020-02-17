import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizzesService } from 'src/app/services/quizzes.service';
import { IQuiz } from 'src/app/models/quiz';
import { ISort } from 'src/app/models/sort';

@Component({
	templateUrl: './quizzes-table.component.html'
})
export class QuizzesTableComponent implements OnInit {
	quizzes: IQuiz[];

	constructor(private quizzesService: QuizzesService, private router: Router) { }

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

	findQuizById(id: number): void {
		this.router.navigateByUrl('/quizzes/form/' + id);
	}

	getKey(index: number, quiz: IQuiz) {
		return quiz.id;
	}

}