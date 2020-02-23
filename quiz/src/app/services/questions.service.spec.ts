import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { QuestionsService } from './questions.service';
import { IQuestion } from '../models/question';
import { Answer } from '../enums/answer';
import { Points } from '../enums/points';
import { IQuiz } from '../models/quiz';
import { IPageable } from '../models/pageable';
import { IPage } from '../models/page';

describe('QuestionsServiceTest', () => {
	const url: string = 'http://localhost:8080/quiz-service/questions';
	let service: QuestionsService;
	let httpMock: HttpTestingController;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
			providers: [QuestionsService]
		});
	});

	beforeEach(() => {
		service = TestBed.get(QuestionsService);
		httpMock = TestBed.get(HttpTestingController);
	});

	it('should create service', () => {
		expect(service).toBeDefined();
	});

	it('should retrive questions by quiz', () => {
		const quiz: IQuiz = { id: 1, name: 'Quiz' };
		const questions: IQuestion[] = [
			{
				id: 1, text: 'Question A', answerA: 'Answer A', answerB: 'Answer B',
				answerC: 'Answer C', answerD: 'Answer D', correctAnswer: Answer.A, points: Points.TEN, quiz: quiz
			}, {
				id: 2, text: 'Question B', answerA: 'Answer A', answerB: 'Answer B',
				answerC: 'Answer C', answerD: 'Answer D', correctAnswer: Answer.A, points: Points.TEN, quiz: quiz
			}];

		service.findQuestionsByQuiz(quiz, 2).subscribe((response) => {
			expect(response.body.length).toEqual(2);
		});

		const request: TestRequest = httpMock.expectOne(`${url}/quiz/1/2`);

		expect(request.request.method).toBe('GET');

		request.flush(questions);
		httpMock.verify();
	});

	it('should retrive questions by page', () => {
		const pageable: IPageable = { page: 0, size: 10, sort: 'id' };
		const page: IPage<IQuestion> = {
			content: [
				{
					id: 1, text: 'Question A', answerA: 'Answer A', answerB: 'Answer B',
					answerC: 'Answer C', answerD: 'Answer D', correctAnswer: Answer.A, points: Points.TEN, quiz: { id: 1, name: 'Quiz' }
				}, {
					id: 2, text: 'Question B', answerA: 'Answer A', answerB: 'Answer B',
					answerC: 'Answer C', answerD: 'Answer D', correctAnswer: Answer.A, points: Points.TEN, quiz: { id: 1, name: 'Quiz' }
				}], size: 10, number: 0, totalPages: 1, last: true, first: true
		};

		service.findAllQuestions(pageable).subscribe((response) => {
			expect(response.body.content.length).toEqual(2);
		});

		const request: TestRequest = httpMock.expectOne(`${url}?page=0&size=10&sort=id`);

		expect(request.request.method).toBe('GET');

		request.flush(page);
		httpMock.verify();
	});

	it('should retrive question by id', () => {
		const question: IQuestion =
		{
			id: 1, text: 'Question', answerA: 'Answer A', answerB: 'Answer B',
			answerC: 'Answer C', answerD: 'Answer D', correctAnswer: Answer.A, points: Points.TEN, quiz: { id: 1, name: 'Quiz' }
		};

		service.findQuestionById(1).subscribe((response) => {
			expect(response.body.text).toEqual('Question');
		});

		const request: TestRequest = httpMock.expectOne(`${url}/1`);

		expect(request.request.method).toBe('GET');

		request.flush(question);
		httpMock.verify();
	});

	it('should save question', () => {
		const question: IQuestion =
		{
			id: 1, text: 'Question', answerA: 'Answer A', answerB: 'Answer B',
			answerC: 'Answer C', answerD: 'Answer D', correctAnswer: Answer.A, points: Points.TEN, quiz: { id: 1, name: 'Quiz' }
		};

		service.saveQuestion(question).subscribe((response) => {
			expect(response.body.text).toEqual('Question');
		});

		const request: TestRequest = httpMock.expectOne(url);

		expect(request.request.method).toBe('POST');

		request.flush(question);
		httpMock.verify();
	});

	it('should update question', () => {
		const question: IQuestion =
		{
			id: 1, text: 'Question', answerA: 'Answer A', answerB: 'Answer B',
			answerC: 'Answer C', answerD: 'Answer D', correctAnswer: Answer.A, points: Points.TEN, quiz: { id: 1, name: 'Quiz' }
		};

		service.updateQuestion(question).subscribe((response) => {
			expect(response.body.text).toEqual('Question');
		});

		const request: TestRequest = httpMock.expectOne(`${url}/1`);

		expect(request.request.method).toBe('PUT');

		request.flush(question);
		httpMock.verify();
	});

	it('should delete question by id', () => {
		service.deleteQuestionById(1).subscribe((response) => {
			expect(response.status).toEqual(204);
		});

		const request: TestRequest = httpMock.expectOne(`${url}/1`);

		expect(request.request.method).toBe('DELETE');

		request.flush(null, { status: 204, statusText: 'No Content' });
		httpMock.verify();
	});

});