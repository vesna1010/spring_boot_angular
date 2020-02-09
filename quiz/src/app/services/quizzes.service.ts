import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IQuiz } from '../models/quiz';
import { ISort } from '../models/sort';

@Injectable()
export class QuizzesService {
	private url: string = 'http://localhost:8080/quiz-service/quizzes';

	constructor(private http: HttpClient) { }

	findAllQuizzes(sort: ISort): Observable<HttpResponse<IQuiz[]>> {
		return this.http.get<IQuiz[]>(this.url, { params: { sort: sort.sort}, observe: 'response' });
	}

	findQuizById(id: number): Observable<HttpResponse<IQuiz>> {
		return this.http.get<IQuiz>((`${this.url}/${id}`), { observe: 'response' });
	}

	saveQuiz(quiz: IQuiz): Observable<HttpResponse<IQuiz>> {
		return this.http.post<IQuiz>(this.url, quiz, { observe: 'response' });
	}

	updateQuiz(quiz: IQuiz): Observable<HttpResponse<IQuiz>> {
		return this.http.put<IQuiz>((`${this.url}/${quiz.id}`), quiz, { observe: 'response' });
	}

	deleteQuizById(id: number): Observable<HttpResponse<void>> {
		return this.http.delete<void>((`${this.url}/${id}`), { observe: 'response' });
	}

}