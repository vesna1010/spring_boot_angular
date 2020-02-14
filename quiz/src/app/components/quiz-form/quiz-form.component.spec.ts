import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { of, throwError } from 'rxjs';
import { QuizzesService } from 'src/app/services/quizzes.service';
import { QuizFormComponent } from './quiz-form.component';

describe('QuizFormComponentTest', () => {
	let fixture: ComponentFixture<QuizFormComponent>;
	let component: QuizFormComponent;
	let debugElement: DebugElement;
	let quizzesService: QuizzesService;
	let activatedRoute: ActivatedRoute;
	let router: Router;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule, FormsModule, RouterTestingModule],
			declarations: [QuizFormComponent],
			providers: [QuizzesService, {
				provide: ActivatedRoute, useValue: {
					snapshot: { params: { id: 1 } }
				}
			}]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(QuizFormComponent);
		component = fixture.componentInstance;
		debugElement = fixture.debugElement;
		quizzesService = TestBed.get(QuizzesService);
		activatedRoute = TestBed.get(ActivatedRoute);
		router = TestBed.get(Router);
	});

	it('should create component', () => {
		expect(component).toBeDefined();
	});

	it('should show "Loading data. Please wait..."', () => {
		fixture.detectChanges();

		const divElement: HTMLDivElement = debugElement.query(By.css('div')).nativeElement;

		expect(divElement.textContent).toEqual('Loading data. Please wait...');
	});

	it('should show empty form', () => {
		activatedRoute.snapshot.params = { id: 0 };

		component.ngOnInit();

		fixture.detectChanges();

		const nameElement: HTMLInputElement = debugElement.query(By.css('#name')).nativeElement;
		const buttonElement: HTMLButtonElement = debugElement.query(By.css('button')).nativeElement;

		expect(nameElement.value).toEqual('');
		expect(buttonElement.textContent).toEqual('Save');
	});

	it('should show form with quiz', async(() => {
		const spy = spyOn(quizzesService, 'findQuizById').and.returnValue(of(new HttpResponse({ body: { id: 1, name: 'Quiz' } })));

		fixture.detectChanges();

		fixture.whenStable().then(() => {
			fixture.detectChanges();

			const nameElement: HTMLInputElement = debugElement.query(By.css('#name')).nativeElement;
			const buttonElement: HTMLButtonElement = debugElement.query(By.css('button')).nativeElement;

			expect(nameElement.value).toEqual('Quiz');
			expect(buttonElement.textContent).toEqual('Update');
		});

		component.ngOnInit();
	}));

	it('should show error message', async(() => {
		const spyQuizzesService = spyOn(quizzesService, 'findQuizById').and.returnValue(throwError({ error: { message: 'No quiz with id 1' } }));
		const spyAlert = spyOn(window, 'alert');
		const spyRouter = spyOn(router, 'navigateByUrl');

		fixture.whenStable().then(() => {
			fixture.detectChanges();

			expect(spyQuizzesService.calls.first().args[0]).toEqual(1);
			expect(spyAlert.calls.first().args[0]).toEqual('No quiz with id 1');
			expect(spyRouter.calls.first().args[0]).toEqual('/quizzes/form');
		});

		component.ngOnInit();
	}));

	it('should save quiz', async(() => {
		const spyQuizzesService = spyOn(quizzesService, 'saveQuiz').and.returnValue(of(new HttpResponse({ body: { id: 1, name: 'Quiz' } })));
		const spyAlert = spyOn(window, 'alert');

		component.quiz = { id: null, name: 'Quiz' };

		fixture.detectChanges();

		fixture.whenStable().then(() => {
			fixture.detectChanges();

			expect(spyQuizzesService.calls.first().args[0]).toEqual({ id: null, name: 'Quiz' });
			expect(spyAlert.calls.first().args[0]).toEqual('Your Data Has Been Successfully Saved.');
			expect(component.quiz).toEqual({ id: 1, name: 'Quiz' });
		});

		component.saveQuiz();
	}));

	it('should update quiz', async(() => {
		const spyQuizzesService = spyOn(quizzesService, 'updateQuiz').and.returnValue(of(new HttpResponse({ body: { id: 1, name: 'Quiz' } })));
		const spyAlert = spyOn(window, 'alert');

		component.quiz = { id: 1, name: 'Quiz' };

		fixture.detectChanges();

		fixture.whenStable().then(() => {
			fixture.detectChanges();

			expect(spyQuizzesService.calls.first().args[0]).toEqual({ id: 1, name: 'Quiz' });
			expect(spyAlert.calls.first().args[0]).toEqual('Your Data Has Been Successfully Updated.');
			expect(component.quiz).toEqual({ id: 1, name: 'Quiz' });
		});

		component.updateQuiz();
	}));

	afterEach(() => {
		fixture = null;
		component = null;
		debugElement = null;
		quizzesService = null;
		activatedRoute = null;
		router = null;
	});

});