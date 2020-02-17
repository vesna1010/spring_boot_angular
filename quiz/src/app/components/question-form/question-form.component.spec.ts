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

	it('should create component', () => {
		expect(component).toBeDefined();
	});

	it('should show "Loading data. Please wait..."', () => {
		fixture.detectChanges();

		const divElement: HTMLDivElement = debugElement.query(By.css('div')).nativeElement;

		expect(divElement.textContent).toEqual('Loading data. Please wait...');
	});

	it('should show empty form', async(() => {
		activatedRoute.snapshot.params = { id: 0 };

		const spy = spyOn(quizzesService, 'findAllQuizzes').and.returnValue(of(new HttpResponse({ body: [{ id: 1, name: 'Quiz A' }, { id: 2, name: 'Quiz B' }] })));;

		fixture.detectChanges();

		fixture.whenStable().then(() => {
			fixture.detectChanges();

			const textElement: HTMLInputElement = debugElement.query(By.css('#text')).nativeElement;
			const answerAElement: HTMLInputElement = debugElement.query(By.css('#answerA')).nativeElement;
			const answerBElement: HTMLInputElement = debugElement.query(By.css('#answerB')).nativeElement;
			const answerCElement: HTMLInputElement = debugElement.query(By.css('#answerC')).nativeElement;
			const answerDElement: HTMLInputElement = debugElement.query(By.css('#answerD')).nativeElement;
			const correctAnswerElement: HTMLSelectElement = debugElement.query(By.css('#correctAnswer')).nativeElement;
			const pointsElement: HTMLSelectElement = debugElement.query(By.css('#points')).nativeElement;
			const quizElement: HTMLSelectElement = debugElement.query(By.css('#quiz')).nativeElement;
			const buttonElement: HTMLButtonElement = debugElement.query(By.css('button')).nativeElement;
			const optionElements: HTMLOptionElement[] = debugElement.queryAll(By.css('#quiz option')).map((elem) => elem.nativeElement);

			expect(textElement.value).toEqual('');
			expect(answerAElement.value).toEqual('');
			expect(answerBElement.value).toEqual('');
			expect(answerCElement.value).toEqual('');
			expect(answerDElement.value).toEqual('');
			expect(correctAnswerElement.value).toEqual('');
			expect(pointsElement.value).toEqual('');
			expect(quizElement.selectedIndex).toEqual(-1);
			expect(buttonElement.textContent).toEqual('Save');
			expect(optionElements[1].textContent).toEqual('Quiz A');
			expect(optionElements[2].textContent).toEqual('Quiz B');
		});

		component.ngOnInit();
	}));

	it('should show form with question', async(() => {
		const spyQuestionsService = spyOn(questionsService, 'findQuestionById').and.returnValue(of(new HttpResponse({
			body: {
				id: 1, text: 'Question', answerA: 'Answer A', answerB: 'Answer B',
				answerC: 'Answer C', answerD: 'Answer D', correctAnswer: Answer.B, points: Points.TWENTY, quiz: { id: 1, name: 'Quiz A' }
			}
		})));
		const spyQuizzesService = spyOn(quizzesService, 'findAllQuizzes').and.returnValue(of(new HttpResponse({ body: [{ id: 1, name: 'Quiz A' }, { id: 2, name: 'Quiz B' }] })));;

		fixture.detectChanges();

		fixture.whenStable().then(() => {
			fixture.detectChanges();

			const textElement: HTMLInputElement = debugElement.query(By.css('#text')).nativeElement;
			const answerAElement: HTMLInputElement = debugElement.query(By.css('#answerA')).nativeElement;
			const answerBElement: HTMLInputElement = debugElement.query(By.css('#answerB')).nativeElement;
			const answerCElement: HTMLInputElement = debugElement.query(By.css('#answerC')).nativeElement;
			const answerDElement: HTMLInputElement = debugElement.query(By.css('#answerD')).nativeElement;
			const correctAnswerElement: HTMLSelectElement = debugElement.query(By.css('#correctAnswer')).nativeElement;
			const pointsElement: HTMLSelectElement = debugElement.query(By.css('#points')).nativeElement;
			const quizElement: HTMLSelectElement = debugElement.query(By.css('#quiz')).nativeElement;
			const buttonElement: HTMLButtonElement = debugElement.query(By.css('button')).nativeElement;

			expect(textElement.value).toEqual('Question');
			expect(answerAElement.value).toEqual('Answer A');
			expect(answerBElement.value).toEqual('Answer B');
			expect(answerCElement.value).toEqual('Answer C');
			expect(answerDElement.value).toEqual('Answer D');
			expect(correctAnswerElement.value).toEqual('B');
			expect(pointsElement.value).toEqual('20');
			expect(quizElement.selectedIndex).toEqual(1);
			expect(buttonElement.textContent).toEqual('Update');
		});

		component.ngOnInit();
	}));

	it('should show error message', async(() => {
		const spyQuestionsService = spyOn(questionsService, 'findQuestionById').and.returnValue(throwError({ error: { message: 'No question with id 1' } }));;
		const spyAlert = spyOn(window, 'alert');
		const spyRouter = spyOn(router, 'navigateByUrl');

		fixture.whenStable().then(() => {
			fixture.detectChanges();

			expect(spyQuestionsService.calls.first().args[0]).toEqual(1);
			expect(spyAlert.calls.first().args[0]).toEqual('No question with id 1');
			expect(spyRouter.calls.first().args[0]).toEqual('/questions/form');
		});

		component.ngOnInit();
	}));

	it('should save question', async(() => {
		const spyQuestionsService = spyOn(questionsService, 'saveQuestion').and.returnValue(of(new HttpResponse({
			body: {
				id: 1, text: 'Question', answerA: 'Answer A', answerB: 'Answer B',
				answerC: 'Answer C', answerD: 'Answer D', correctAnswer: Answer.B, points: Points.TWENTY, quiz: { id: 1, name: 'Quiz A' }
			}
		})));
		const spyAlert = spyOn(window, 'alert');

		component.question = {
			id: null, text: 'Question', answerA: 'Answer A', answerB: 'Answer B',
			answerC: 'Answer C', answerD: 'Answer D', correctAnswer: Answer.B, points: Points.TWENTY, quiz: { id: 1, name: 'Quiz A' }
		};
		component.quizzes = [{ id: 1, name: 'Quiz A' }, { id: 2, name: 'Quiz B' }];

		fixture.detectChanges();

		fixture.whenStable().then(() => {
			fixture.detectChanges();

			expect(spyQuestionsService.calls.first().args[0]).toEqual({
				id: null, text: 'Question', answerA: 'Answer A', answerB: 'Answer B',
				answerC: 'Answer C', answerD: 'Answer D', correctAnswer: Answer.B, points: Points.TWENTY, quiz: { id: 1, name: 'Quiz A' }
			});
			expect(spyAlert.calls.first().args[0]).toEqual('Your Data Has Been Successfully Saved.');
			expect(component.question).toEqual({
				id: 1, text: 'Question', answerA: 'Answer A', answerB: 'Answer B',
				answerC: 'Answer C', answerD: 'Answer D', correctAnswer: Answer.B, points: Points.TWENTY, quiz: { id: 1, name: 'Quiz A' }
			});
			expect(component.quizzes.length).toEqual(2);
		});

		component.saveQuestion();
	}));

	it('should update question', async(() => {
		const spyQuestionsService = spyOn(questionsService, 'updateQuestion').and.returnValue(of(new HttpResponse({
			body: {
				id: 1, text: 'Question', answerA: 'Answer A', answerB: 'Answer B',
				answerC: 'Answer C', answerD: 'Answer D', correctAnswer: Answer.B, points: Points.TWENTY, quiz: { id: 1, name: 'Quiz A' }
			}
		})));
		const spyAlert = spyOn(window, 'alert');

		component.question = {
			id: 1, text: 'Question', answerA: 'Answer A', answerB: 'Answer B',
			answerC: 'Answer C', answerD: 'Answer D', correctAnswer: Answer.B, points: Points.TWENTY, quiz: { id: 1, name: 'Quiz A' }
		};
		component.quizzes = [{ id: 1, name: 'Quiz A' }, { id: 2, name: 'Quiz B' }];

		fixture.detectChanges();

		fixture.whenStable().then(() => {
			fixture.detectChanges();

			expect(spyQuestionsService.calls.first().args[0]).toEqual({
				id: 1, text: 'Question', answerA: 'Answer A', answerB: 'Answer B',
				answerC: 'Answer C', answerD: 'Answer D', correctAnswer: Answer.B, points: Points.TWENTY, quiz: { id: 1, name: 'Quiz A' }
			});
			expect(spyAlert.calls.first().args[0]).toEqual('Your Data Has Been Successfully Updated.');
			expect(component.question).toEqual({
				id: 1, text: 'Question', answerA: 'Answer A', answerB: 'Answer B',
				answerC: 'Answer C', answerD: 'Answer D', correctAnswer: Answer.B, points: Points.TWENTY, quiz: { id: 1, name: 'Quiz A' }
			});
		});
		expect(component.quizzes.length).toEqual(2);

		component.updateQuestion();
	}));

	afterEach(() => {
		fixture = null;
		component = null;
		debugElement = null;
		quizzesService = null;
		questionsService = null;
		activatedRoute = null;
		router = null;
	});

});