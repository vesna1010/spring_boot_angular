import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { HomeComponent } from './home.component';
import { QuizzesService } from 'src/app/services/quizzes.service';

describe('HomeComponentTest', () => {
	let fixture: ComponentFixture<HomeComponent>;
	let component: HomeComponent;
	let debugElement: DebugElement;
	let quizzesService: QuizzesService;
	let router: Router;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule, RouterTestingModule, FormsModule],
			declarations: [HomeComponent],
			providers: [QuizzesService]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(HomeComponent);
		component = fixture.componentInstance;
		debugElement = fixture.debugElement;
		quizzesService = TestBed.get(QuizzesService);
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

	it('should show "There is no quizzes for play"', () => {
		component.quizzes = [];

		fixture.detectChanges();

		const divElement: HTMLDivElement = debugElement.query(By.css('div')).nativeElement;

		expect(divElement.textContent).toEqual('There is no quizzes for play.');
	});

	it('should show quizzes in form', async(() => {
		const spyQuizzesService = spyOn(quizzesService, 'findAllQuizzes').and.returnValue(of(new HttpResponse({
			body: [{ id: 1, name: 'Quiz A' }, { id: 2, name: 'Quiz B' }]
		})));
		const spyLocalStorage = spyOn(localStorage, 'removeItem');

		fixture.whenStable().then(() => {
			fixture.detectChanges();

			const optionElements: HTMLOptionElement[] = debugElement.queryAll(By.css('option')).map((el) => el.nativeElement);

			expect(optionElements.length).toEqual(2);
			expect(optionElements[0].textContent).toEqual('Quiz A');
			expect(optionElements[1].textContent).toEqual('Quiz B');

			expect(spyQuizzesService.calls.first().args[0]).toEqual({ sort: 'name' });
			expect(spyLocalStorage.calls.first().args[0]).toEqual('quiz');
		});

		component.ngOnInit();
	}));

	it('sholuld navigate to "/play"', () => {
		const spyLocalStorage = spyOn(localStorage, 'setItem');
		const spyRouter = spyOn(router, 'navigateByUrl');

		component.quiz = { id: 1, name: 'Quiz' };

		component.setQuiz();

		expect(spyLocalStorage.calls.first().args[0]).toEqual('quiz');
		expect(spyLocalStorage.calls.first().args[1]).toEqual(JSON.stringify({ id: 1, name: 'Quiz' }));
		expect(spyRouter.calls.first().args[0]).toEqual('/play');
	});

	afterEach(() => {
		fixture = null;
		component = null;
		debugElement = null;
		quizzesService = null;
		router = null;
	});

});