import { Component, OnInit, DoCheck } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionsService } from 'src/app/services/questions.service';
import { QuizzesService } from 'src/app/services/quizzes.service';
import { IQuestion } from 'src/app/models/question';
import { IQuiz } from 'src/app/models/quiz';
import { ISort } from 'src/app/models/sort';
import { Points } from 'src/app/enums/points';
import { Answer } from 'src/app/enums/answer';

@Component({
	templateUrl: './question-form.component.html'
})
export class QuestionFormComponent implements OnInit, DoCheck {
	Points = Points;
	Answer = Answer;
	question: IQuestion;
	quizzes: IQuiz[];

	constructor(private questionsService: QuestionsService, private quizzesService: QuizzesService,
		private router: Router, private activatedRoute: ActivatedRoute) { }

	ngOnInit(): void {
		const id: number = Number(this.activatedRoute.snapshot.params.id);
		const sort: ISort = { sort: 'name' };

		if (id) {
			this.setQuestionById(id);
		} else {
			this.question = {
				id: null, text: null, answerA: null, answerB: null, answerC: null, answerD: null,
				correctAnswer: null, quiz: { id: null, name: null }, points: null
			};
		}

		this.quizzesService.findAllQuizzes(sort).subscribe(
			(response) => {
				this.quizzes = response.body;
			});
	}

	private setQuestionById(id: number): void {
		this.questionsService.findQuestionById(id).subscribe(
			(response) => {
				this.question = response.body;
			}, (e) => {
				alert(e.error.message);
				this.router.navigateByUrl('/questions/form');
			});
	}

	ngDoCheck(): void {
		if (this.quizzes && this.question && this.question.quiz) {
			const quiz: IQuiz = this.quizzes.filter((value) => value.id === this.question.quiz.id).pop();

			this.question.quiz = quiz;
		}
	}

	saveQuestion(): void {
		this.questionsService.saveQuestion(this.question).subscribe(
			(response) => {
				alert('Your Data Has Been Successfully Saved.');
				this.question = response.body;
			});
	}

	updateQuestion(): void {
		this.questionsService.updateQuestion(this.question).subscribe(
			(response) => {
				alert('Your Data Has Been Successfully Updated.');
				this.question = response.body;
			});
	}

}