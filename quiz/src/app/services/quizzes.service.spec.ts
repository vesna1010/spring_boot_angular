import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { QuizzesService } from './quizzes.service';
import { IQuiz } from '../models/quiz';
import { ISort } from '../models/sort';

describe('QuizzesServiceTest', () => {
	const url: string = 'http://localhost:8080/quiz-service/quizzes';
	let service: QuizzesService;
	let httpMock: HttpTestingController;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
			providers: [QuizzesService]
		});
	});

	beforeEach(() => {
		service = TestBed.get(QuizzesService);
		httpMock = TestBed.get(HttpTestingController);
	});

	it('should create service', () => {
		expect(service).toBeDefined();
	});

	it('should retrive quizzes', () => {
		const sort: ISort = { sort: 'id' };
		const questions: IQuiz[] = [{ id: 1, name: 'Quiz A' }, { id: 2, name: 'Quiz B' }];

		service.findAllQuizzes(sort).subscribe((response) => {
			expect(response.body.length).toEqual(2);
		});

		const request: TestRequest = httpMock.expectOne(`${url}?sort=id`);

		expect(request.request.method).toBe('GET');

		request.flush(questions);
		httpMock.verify();
	});

	it('should retrive quiz by id', () => {
		const quiz: IQuiz = { id: 1, name: 'Quiz' };

		service.findQuizById(1).subscribe((response) => {
			expect(response.body.name).toEqual('Quiz');
		});

		const request: TestRequest = httpMock.expectOne(`${url}/1`);

		expect(request.request.method).toBe('GET');

		request.flush(quiz);
		httpMock.verify();
	});

	it('should save quiz', () => {
		const quiz: IQuiz = { id: 1, name: 'Quiz' };

		service.saveQuiz(quiz).subscribe((response) => {
			expect(response.body.name).toEqual('Quiz');
		});

		const request: TestRequest = httpMock.expectOne(url);

		expect(request.request.method).toBe('POST');

		request.flush(quiz);
		httpMock.verify();
	});

	it('should update quiz', () => {
		const quiz: IQuiz = { id: 1, name: 'Quiz' };

		service.updateQuiz(quiz).subscribe((response) => {
			expect(response.body.name).toEqual('Quiz');
		});

		const request: TestRequest = httpMock.expectOne(`${url}/1`);

		expect(request.request.method).toBe('PUT');

		request.flush(quiz);
		httpMock.verify();
	});

	it('should delete quiz by id', () => {
		service.deleteQuizById(1).subscribe((response) => {
			expect(response.status).toEqual(204);
		});

		const request: TestRequest = httpMock.expectOne(`${url}/1`);

		expect(request.request.method).toBe('DELETE');

		request.flush(null, { status: 204, statusText: 'No Content' });
		httpMock.verify();
	});

});