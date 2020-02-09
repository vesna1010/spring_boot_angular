import { Answer } from '../enums/answer';
import { Points } from '../enums/points';
import { IQuiz } from './quiz';

export interface IQuestion {
	id: number;
	text: string;
	answerA: string;
	answerB: string;
	answerC: string;
	answerD: string;
	correctAnswer: Answer;
	points: Points;
	quiz: IQuiz;
}