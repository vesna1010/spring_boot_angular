import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizzesService } from 'src/app/services/quizzes.service';
import { IQuiz } from 'src/app/models/quiz';

@Component({
	templateUrl: './quiz-form.component.html'
})
export class QuizFormComponent implements OnInit {
	quiz: IQuiz;

	constructor(private quizzesService: QuizzesService, private router: Router,
		private activatedRoute: ActivatedRoute) { }

	ngOnInit(): void {
		const id: number = Number(this.activatedRoute.snapshot.params.id);

		if (id) {
			this.setQuizById(id);
		} else {
			this.quiz = { id: null, name: null };
		}
	}

	private setQuizById(id: number): void {
		this.quizzesService.findQuizById(id).subscribe(
			(response) => {
				this.quiz = response.body;
			}, (e) => {
				alert(e.error.message);
				this.router.navigateByUrl('/quizzes/form');
			});
	}

	saveQuiz(): void {
		this.quizzesService.saveQuiz(this.quiz).subscribe(
			(response) => {
				alert('Your Data Has Been Successfully Saved.');
				this.quiz = response.body;
			});
	}

	updateQuiz(): void {
		this.quizzesService.updateQuiz(this.quiz).subscribe(
			(response) => {
				alert('Your Data Has Been Successfully Updated.');
				this.quiz = response.body;
			});
	}

}