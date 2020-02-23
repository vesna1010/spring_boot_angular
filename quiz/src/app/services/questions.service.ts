import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IQuestion } from '../models/question';
import { IPage } from '../models/page';
import { IPageable } from '../models/pageable';
import { IQuiz } from '../models/quiz';

@Injectable()
export class QuestionsService {
	private url: string = 'http://localhost:8080/quiz-service/questions';

	constructor(private http: HttpClient) {
	}

	findQuestionsByQuiz(quiz: IQuiz, size: number): Observable<HttpResponse<IQuestion[]>> {
		return this.http.get<IQuestion[]>((`${this.url}/quiz/${quiz.id}/${size}`), { observe: 'response' });
	}

	findAllQuestions(pageable: IPageable): Observable<HttpResponse<IPage<IQuestion>>> {
		return this.http.get<IPage<IQuestion>>(this.url,
			{ params: { page: `${pageable.page}`, size: `${pageable.size}`, sort: pageable.sort }, observe: 'response' });
	}

	findQuestionById(id: number): Observable<HttpResponse<IQuestion>> {
		return this.http.get<IQuestion>((`${this.url}/${id}`), { observe: 'response' });
	}

	saveQuestion(question: IQuestion): Observable<HttpResponse<IQuestion>> {
		return this.http.post<IQuestion>(this.url, question, { observe: 'response' });
	}

	updateQuestion(question: IQuestion): Observable<HttpResponse<IQuestion>> {
		return this.http.put<IQuestion>((`${this.url}/${question.id}`), question, { observe: 'response' });
	}

	deleteQuestionById(id: number): Observable<HttpResponse<void>> {
		return this.http.delete<void>((`${this.url}/${id}`), { observe: 'response' });
	}

}