import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IQuestion } from 'src/app/models/question';
import { IQuiz } from 'src/app/models/quiz';
import { QuestionsService } from 'src/app/services/questions.service';

@Component({
	templateUrl: './play-quiz.component.html'
})
export class PlayQuizComponent implements OnInit {
	numberOfQuestion: number = 0;
	score: number = 0;
	quiz: IQuiz;
	questions: IQuestion[];

	constructor(private questionsService: QuestionsService, private router: Router) {
	}

	ngOnInit(): void {
		this.quiz = JSON.parse(localStorage.getItem('quiz'));

		if (!this.quiz) {
			this.router.navigateByUrl('/');
		}

		this.questionsService.findQuestionsByQuiz(this.quiz, 10).subscribe(
			(response) => {
				this.questions = response.body;
			});
	};

	addPoints(points: number): void {
		this.score += points;
	}

	nextQuestion(): void {
		this.numberOfQuestion += 1;
	}

}