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

	it('should show "Loading data. Please wait.."', () => {
		fixture.detectChanges();

		expect(debugElement.query(By.css('td')).nativeElement.textContent).toEqual('Loading data. Please wait...');
	});

	it('should show "No Data"', () => {
		component.quizzes = [];

		fixture.detectChanges();

		expect(debugElement.query(By.css('td')).nativeElement.textContent).toEqual('No Data');
	});

	it('should show quizzes', () => {
		component.quizzes = [{ id: 1, name: 'Quiz A' }, { id: 2, name: 'Quiz B' }];

		fixture.detectChanges();

		const debugElements: DebugElement[] = debugElement.queryAll(By.css('td'));

		expect(debugElements[1].nativeElement.textContent).toEqual('Quiz A');
		expect(debugElements[4].nativeElement.textContent).toEqual('Quiz B');
	});

	it('should init quizzes', async(() => {
		const spy = spyOn(quizzesService, 'findAllQuizzes').and.returnValue(of(new HttpResponse({
			body: [{ id: 1, name: 'Quiz A' }, { id: 2, name: 'Quiz B' }]
		})));

		fixture.whenStable().then(() => {
			fixture.detectChanges();

			expect(spy).toHaveBeenCalledWith({ sort: 'id' });
			expect(component.quizzes.length).toEqual(2);
		});

		component.ngOnInit();
	}));

	it('should delete quiz by id', async(() => {
		const spy1 = spyOn(quizzesService, 'deleteQuizById').and.returnValue(of(new HttpResponse()));
		const spy2 = spyOn(window, 'alert');
		const spy3 = spyOn(quizzesService, 'findAllQuizzes').and.returnValue(of(new HttpResponse({
			body: [{ id: 1, name: 'Quiz A' }, { id: 2, name: 'Quiz B' }]
		})));

		fixture.whenStable().then(() => {
			fixture.detectChanges();

			expect(spy1).toHaveBeenCalledWith(1);
			expect(spy2).toHaveBeenCalledWith('Your Data Has Been Successfully Deleted.');
			expect(spy3).toHaveBeenCalledWith({ sort: 'id' });
			expect(component.quizzes.length).toEqual(2);
		});

		component.deleteQuizById(1);
	}));

});
