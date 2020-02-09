import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IQuiz } from 'src/app/models/quiz';
import { ISort } from 'src/app/models/sort';
import { QuizzesService } from 'src/app/services/quizzes.service';

@Component({
	templateUrl: './home.component.html'
})
export class HomeComponent {
	quizzes: IQuiz[];
	quiz: IQuiz;

	constructor(private quizzesService: QuizzesService, private router: Router) { }

	ngOnInit(): void {
		const sort: ISort = { sort: 'name' };

		this.quizzesService.findAllQuizzes(sort).subscribe(
			(response) => {
				this.quizzes = response.body;
			});

		localStorage.removeItem('quiz');
	}

	setQuiz(): void {
		localStorage.setItem('quiz', JSON.stringify(this.quiz));
		this.router.navigateByUrl('/play');
	}

}