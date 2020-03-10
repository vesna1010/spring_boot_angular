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

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule, RouterTestingModule, FormsModule],
			declarations: [HomeComponent],
			providers: [QuizzesService]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(HomeComponent);
		component = fixture.componentInstance;
		debugElement = fixture.debugElement;
		quizzesService = TestBed.get(QuizzesService);
		router = TestBed.get(Router);
	});

	afterEach(() => {
		fixture = null;
		component = null;
		debugElement = null;
		quizzesService = null;
		router = null;
	});

	it('should create component', () => {
		expect(component).toBeDefined();
	});

	it('should show "Loading data. Please wait..."', () => {
		fixture.detectChanges();

		expect(debugElement.query(By.css('div')).nativeElement.textContent).toEqual('Loading data. Please wait...');
	});

	it('should show "There is no quizzes for play"', () => {
		component.quizzes = [];

		fixture.detectChanges();

		expect(debugElement.query(By.css('div')).nativeElement.textContent).toEqual('There is no quizzes for play.');
	});

	it('should show quizzes in form', () => {
		component.quizzes = [{ id: 1, name: 'Quiz A' }, { id: 2, name: 'Quiz B' }];

		fixture.detectChanges();

		const debugElements: DebugElement[] = debugElement.queryAll(By.css('option'));

		expect(debugElements.length).toEqual(2);
		expect(debugElements[0].nativeElement.textContent).toEqual('Quiz A');
		expect(debugElements[1].nativeElement.textContent).toEqual('Quiz B');
	});

	it('should init quizzes', async(() => {
		const spy1 = spyOn(quizzesService, 'findAllQuizzes').and.returnValue(of(new HttpResponse({
			body: [{ id: 1, name: 'Quiz A' }, { id: 2, name: 'Quiz B' }]
		})));
		const spy2 = spyOn(localStorage, 'removeItem');

		fixture.whenStable().then(() => {
			fixture.detectChanges();

			expect(spy1).toHaveBeenCalledWith({ sort: 'name' });
			expect(spy2).toHaveBeenCalledWith('quiz');
			expect(component.quizzes.length).toEqual(2);
		});

		component.ngOnInit();
	}));

	it('sholuld navigate to "/play"', () => {
		component.quiz = { id: 1, name: 'Quiz' };

		const spy1 = spyOn(localStorage, 'setItem');
		const spy2 = spyOn(router, 'navigateByUrl');

		component.setQuiz();

		expect(spy1).toHaveBeenCalledWith('quiz', JSON.stringify({ id: 1, name: 'Quiz' }));
		expect(spy2).toHaveBeenCalledWith('/play');
	});

});
