import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { QuizzesService } from 'src/app/services/quizzes.service';
import { QuizzesTableComponent } from './quizzes-table.component';

describe('QuizzesTableComponentTest', () => {
	let fixture: ComponentFixture<QuizzesTableComponent>;
	let component: QuizzesTableComponent;
	let debugElement: DebugElement;
	let quizzesService: QuizzesService;
	let router: Router;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule, RouterTestingModule],
			declarations: [QuizzesTableComponent],
			providers: [QuizzesService]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(QuizzesTableComponent);
		component = fixture.componentInstance;
		debugElement = fixture.debugElement;
		quizzesService = TestBed.get(QuizzesService);
		router = TestBed.get(Router);
	});

	it('should create component', () => {
		expect(component).toBeDefined();
	});

	it('should show "Loading data. Please wait.."', () => {
		fixture.detectChanges();

		const trElement: HTMLTableRowElement = debugElement.query(By.css('table tbody tr')).nativeElement;

		expect(trElement.textContent).toEqual('Loading data. Please wait...');
	});

	it('should show "No Data"', () => {
		component.quizzes = [];

		fixture.detectChanges();

		const trElement: HTMLTableRowElement = debugElement.query(By.css('table tbody tr')).nativeElement;

		expect(trElement.textContent).toEqual('No Data');
	});

	it('should show quizzes', async(() => {
		const spy = spyOn(quizzesService, 'findAllQuizzes').and.returnValue(of(new HttpResponse({
			body: [{ id: 1, name: 'Quiz A' }, { id: 2, name: 'Quiz B' }]
		})));

		fixture.whenStable().then(() => {
			fixture.detectChanges();

			const trElements: HTMLTableRowElement[] = debugElement.queryAll(By.css('table tbody tr')).map((elem) => elem.nativeElement);

			expect(trElements.length).toEqual(2);
			expect(trElements[0].innerHTML).toContain('<td>Quiz A</td>');
			expect(trElements[1].innerHTML).toContain('<td>Quiz B</td>');

			expect(spy.calls.first().args[0]).toEqual({ sort: 'id' });
		});

		component.ngOnInit();
	}));

	it('should delete quiz by id', async(() => {
		const spyQuizzesServiceDeleteQuizById = spyOn(quizzesService, 'deleteQuizById').and.returnValue(of(new HttpResponse()));
		const spyAlert = spyOn(window, 'alert');
		const spyQuizzesServicefindAllQuizzes = spyOn(quizzesService, 'findAllQuizzes').and.returnValue(of(new HttpResponse({
			body: [{ id: 1, name: 'Quiz A' }, { id: 2, name: 'Quiz B' }]
		})));

		fixture.whenStable().then(() => {
			fixture.detectChanges();

			expect(spyQuizzesServiceDeleteQuizById.calls.first().args[0]).toEqual(1);
			expect(spyAlert.calls.first().args[0]).toEqual('Your Data Has Been Successfully Deleted.');
			expect(component.quizzes.length).toEqual(2);
		});

		component.deleteQuizById(1);
	}));

	afterEach(() => {
		fixture = null;
		component = null;
		debugElement = null;
		quizzesService = null;
		router = null;
	});

});