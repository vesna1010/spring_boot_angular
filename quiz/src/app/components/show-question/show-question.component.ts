import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { IQuestion } from 'src/app/models/question';
import { Answer } from 'src/app/enums/answer';

@Component({
	selector: 'question',
	templateUrl: './show-question.component.html',
	styleUrls: ['./show-question.component.css']
})
export class ShowQuestionComponent implements OnChanges {
	Answer = Answer;
	@Input() question: IQuestion;
	@Output() eventEmmiter: EventEmitter<string> = new EventEmitter<string>();

	checkAnswer(answer: Answer): void {
		if (this.isCorrectAnswer(answer)) {
			this.setCorrectResult(answer);
		} else {
			this.setIncorrectResult(answer);
		}

		this.disableClickEvent();
	}

	private isCorrectAnswer(answer: Answer): boolean {
		return (this.question.correctAnswer === answer);
	}

	private setCorrectResult(answer: Answer): void {
		const questionTextElement: HTMLElement = document.getElementById('questionText');
		const answerElement: HTMLElement = document.getElementById(answer);

		questionTextElement.classList.add('text-success');
		answerElement.classList.add('bg-success');

		this.question.text = 'CORRECT';
		this.eventEmmiter.emit('CORRECT');
	}

	private setIncorrectResult(answer: Answer): void {
		const correctAnswer: string = this.question.correctAnswer;
		const questionTextElement: HTMLElement = document.getElementById('questionText');
		const answerElement: HTMLElement = document.getElementById(answer);
		const correctAnswerElement: HTMLElement = document.getElementById(correctAnswer);

		questionTextElement.classList.add('text-danger');
		answerElement.classList.add('bg-danger');
		correctAnswerElement.classList.add('bg-success');

		this.question.text = 'INCORRECT';
	}

	private disableClickEvent(): void {
		document.querySelectorAll('[id]').forEach((element) => {
			element.classList.add('disableClick');
		});
	}

	ngOnChanges(): void {
		document.querySelectorAll('[id]').forEach((element) => {
			element.classList.remove('bg-success', 'bg-danger', 'text-success', 'text-danger', 'disableClick');
		});
	}

}