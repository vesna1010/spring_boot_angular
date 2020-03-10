import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { of, throwError } from 'rxjs';
import { QuizzesService } from 'src/app/services/quizzes.service';
import { QuestionsService } from 'src/app/services/questions.service';
import { QuestionFormComponent } from './question-form.component';
import { ToArrayPipe } from 'src/app/pipes/toArray.pipe';
import { Points } from 'src/app/enums/points';
import { Answer } from 'src/app/enums/answer';

describe('QuestionFormComponentTest', () => {
	let fixture: ComponentFixture<QuestionFormComponent>;
	let component: QuestionFormComponent;
	let debugElement: DebugElement;
	let quizzesService: QuizzesService;
	let questionsService: QuestionsService;
	let activatedRoute: ActivatedRoute;
	let router: Router;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule, FormsModule, RouterTestingModule],
			declarations: [QuestionFormComponent, ToArrayPipe],
			providers: [QuizzesService, QuestionsService, {
				provide: ActivatedRoute, useValue: {
					snapshot: { params: { id: 1 } }
				}
			}]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(QuestionFormComponent);
		component = fixture.componentInstance;
		debugElement = fixture.debugElement;
		quizzesService = debugElement.injector.get(QuizzesService);
		questionsService = debugElement.injector.get(QuestionsService);
		activatedRoute = debugElement.injector.get(ActivatedRoute);
		router = debugElement.injector.get(Router);
	});

	afterEach(() => {
		fixture = null;
		component = null;
		debugElement = null;
		quizzesService = null;
		questionsService = null;
		activatedRoute = null;
		router = null;
	});

	it('should create component', () => {
		expect(component).toBeDefined();
	});

	it('should show "Loading data. Please wait..."', () => {
		fixture.detectChanges();

		expect(debugElement.query(By.css('div')).nativeElement.textContent).toEqual('Loading data. Please wait...');
	});

	it('should show empty form', async(() => {
		component.quizzes = [{ id: 1, name: 'Quiz A' }, { id: 2, name: 'Quiz B' }];
		component.question = {
			id: null, text: null, answerA: null, answerB: null, answerC: null, answerD: null,
			correctAnswer: null, quiz: { id: null, name: null }, points: null
		};

		fixture.detectChanges();

		fixture.whenStable().then(() => {
			fixture.detectChanges();

			const debugElements: DebugElement[] = debugElement.queryAll(By.css('#quiz option'));

			expect(debugElements.length).toEqual(3);
			expect(debugElements[1].nativeElement.textContent).toEqual('Quiz A');
			expect(debugElements[2].nativeElement.textContent).toEqual('Quiz B');
			expect(debugElement.query(By.css('#id')).nativeElement.value).toEqual('');
			expect(debugElement.query(By.css('#text')).nativeElement.value).toEqual('');
			expect(debugElement.query(By.css('#answerA')).nativeElement.value).toEqual('');
			expect(debugElement.query(By.css('#answerB')).nativeElement.value).toEqual('');
			expect(debugElement.query(By.css('#answerC')).nativeElement.value).toEqual('');
			expect(debugElement.query(By.css('#answerD')).nativeElement.value).toEqual('');
			expect(debugElement.query(By.css('#correctAnswer')).nativeElement.value).toEqual('');
			expect(debugElement.query(By.css('#points')).nativeElement.value).toEqual('');
			expect(debugElement.query(By.css('#quiz')).nativeElement.selectedIndex).toEqual(-1);
			expect(debugElement.query(By.css('button')).nativeElement.textContent).toEqual('Save');
		});
	}));

	it('should show form with question', async(() => {
		component.quizzes = [{ id: 1, name: 'Quiz A' }, { id: 2, name: 'Quiz B' }];
		component.question = {
			id: 1, text: 'Question', answerA: 'A', answerB: 'B', answerC: 'C', answerD: 'D',
			correctAnswer: Answer.B, quiz: { id: 1, name: 'Quiz A' }, points: Points.FIFTY
		};

		fixture.detectChanges();

		fixture.whenStable().then(() => {
			fixture.detectChanges();

			const debugElements: DebugElement[] = debugElement.queryAll(By.css('#quiz option'));

			expect(debugElements.length).toEqual(3);
			expect(debugElements[1].nativeElement.textContent).toEqual('Quiz A');
			expect(debugElements[2].nativeElement.textContent).toEqual('Quiz B');
			expect(debugElement.query(By.css('#id')).nativeElement.value).toEqual('1');
			expect(debugElement.query(By.css('#text')).nativeElement.value).toEqual('Question');
			expect(debugElement.query(By.css('#answerA')).nativeElement.value).toEqual('A');
			expect(debugElement.query(By.css('#answerB')).nativeElement.value).toEqual('B');
			expect(debugElement.query(By.css('#answerC')).nativeElement.value).toEqual('C');
			expect(debugElement.query(By.css('#answerD')).nativeElement.value).toEqual('D');
			expect(debugElement.query(By.css('#correctAnswer')).nativeElement.value).toEqual('B');
			expect(debugElement.query(By.css('#points')).nativeElement.value).toEqual('50');
			expect(debugElement.query(By.css('#quiz')).nativeElement.selectedIndex).toEqual(1);
			expect(debugElement.query(By.css('button')).nativeElement.textContent).toEqual('Update');
		});
	}));

	it('should init question', async(() => {
		const spy1 = spyOn(questionsService, 'findQuestionById').and.returnValue(of(new HttpResponse({
			body: {
				id: 1, text: 'Question', answerA: 'Answer A', answerB: 'Answer B',
				answerC: 'Answer C', answerD: 'Answer D', correctAnswer: Answer.B, points: Points.TWENTY, quiz: { id: 1, name: 'Quiz A' }
			}
		})));
		const spy2 = spyOn(quizzesService, 'findAllQuizzes').and.returnValue(of(new HttpResponse({ body: [{ id: 1, name: 'Quiz A' }, { id: 2, name: 'Quiz B' }] })));;

		fixture.detectChanges();

		fixture.whenStable().then(() => {
			fixture.detectChanges();

			expect(spy1).toHaveBeenCalledWith(1);
			expect(spy2).toHaveBeenCalledWith({ sort: 'name' });
			expect(component.question).toEqual({
				id: 1, text: 'Question', answerA: 'Answer A', answerB: 'Answer B',
				answerC: 'Answer C', answerD: 'Answer D', correctAnswer: Answer.B, points: Points.TWENTY, quiz: { id: 1, name: 'Quiz A' }
			});
			expect(component.quizzes.length).toEqual(2);
		});

		component.ngOnInit();
	}));

	it('should show error message', async(() => {
		const spy1 = spyOn(questionsService, 'findQuestionById').and.returnValue(throwError({ error: { message: 'No question with id 1' } }));;
		const spy2 = spyOn(window, 'alert');
		const spy3 = spyOn(router, 'navigateByUrl');

		fixture.whenStable().then(() => {
			fixture.detectChanges();

			expect(spy1).toHaveBeenCalledWith(1);
			expect(spy2).toHaveBeenCalledWith('No question with id 1');
			expect(spy3).toHaveBeenCalledWith('/questions/form');
		});

		component.ngOnInit();
	}));

	it('should save question', async(() => {
		component.question = {
			id: null, text: 'Question', answerA: 'Answer A', answerB: 'Answer B',
			answerC: 'Answer C', answerD: 'Answer D', correctAnswer: Answer.B, points: Points.TWENTY, quiz: { id: 1, name: 'Quiz A' }
		};
		component.quizzes = [{ id: 1, name: 'Quiz A' }, { id: 2, name: 'Quiz B' }];

		const spy1 = spyOn(questionsService, 'saveQuestion').and.returnValue(of(new HttpResponse({
			body: {
				id: 1, text: 'Question', answerA: 'Answer A', answerB: 'Answer B',
				answerC: 'Answer C', answerD: 'Answer D', correctAnswer: Answer.B, points: Points.TWENTY, quiz: { id: 1, name: 'Quiz A' }
			}
		})));
		const spy2 = spyOn(window, 'alert');

		fixture.detectChanges();

		fixture.whenStable().then(() => {
			fixture.detectChanges();

			expect(spy1).toHaveBeenCalledWith({
				id: null, text: 'Question', answerA: 'Answer A', answerB: 'Answer B',
				answerC: 'Answer C', answerD: 'Answer D', correctAnswer: Answer.B, points: Points.TWENTY, quiz: { id: 1, name: 'Quiz A' }
			});
			expect(spy2).toHaveBeenCalledWith('Your Data Has Been Successfully Saved.');
			expect(component.question).toEqual({
				id: 1, text: 'Question', answerA: 'Answer A', answerB: 'Answer B',
				answerC: 'Answer C', answerD: 'Answer D', correctAnswer: Answer.B, points: Points.TWENTY, quiz: { id: 1, name: 'Quiz A' }
			});
			expect(component.quizzes.length).toEqual(2);
		});

		component.saveQuestion();
	}));

	it('should update question', async(() => {
		component.question = {
			id: 1, text: 'Question', answerA: 'Answer A', answerB: 'Answer B',
			answerC: 'Answer C', answerD: 'Answer D', correctAnswer: Answer.B, points: Points.TWENTY, quiz: { id: 1, name: 'Quiz A' }
		};
		component.quizzes = [{ id: 1, name: 'Quiz A' }, { id: 2, name: 'Quiz B' }];

		const spy1 = spyOn(questionsService, 'updateQuestion').and.returnValue(of(new HttpResponse({
			body: {
				id: 1, text: 'Question', answerA: 'Answer A', answerB: 'Answer B',
				answerC: 'Answer C', answerD: 'Answer D', correctAnswer: Answer.B, points: Points.TWENTY, quiz: { id: 1, name: 'Quiz A' }
			}
		})));
		const spy2 = spyOn(window, 'alert');

		fixture.detectChanges();

		fixture.whenStable().then(() => {
			fixture.detectChanges();

			expect(spy1).toHaveBeenCalledWith({
				id: 1, text: 'Question', answerA: 'Answer A', answerB: 'Answer B',
				answerC: 'Answer C', answerD: 'Answer D', correctAnswer: Answer.B, points: Points.TWENTY, quiz: { id: 1, name: 'Quiz A' }
			});
			expect(spy2).toHaveBeenCalledWith('Your Data Has Been Successfully Updated.');
			expect(component.question).toEqual({
				id: 1, text: 'Question', answerA: 'Answer A', answerB: 'Answer B',
				answerC: 'Answer C', answerD: 'Answer D', correctAnswer: Answer.B, points: Points.TWENTY, quiz: { id: 1, name: 'Quiz A' }
			});
			expect(component.quizzes.length).toEqual(2);
		});

		component.updateQuestion();
	}));

});
