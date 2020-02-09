import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { QuestionsService } from 'src/app/services/questions.service';
import { QuestionsTableComponent } from './questions-table.component';
import { Router, ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { PaginationComponent } from '../pagination/pagination.component';
import { Answer } from 'src/app/enums/answer';
import { Points } from 'src/app/enums/points';

describe('QuestionTableComponentTest', () => {
	let fixture: ComponentFixture<QuestionsTableComponent>;
	let component: QuestionsTableComponent;
	let debugElement: DebugElement;
	let questionsService: QuestionsService;
	let router: Router;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule, RouterTestingModule],
			declarations: [QuestionsTableComponent, PaginationComponent],
			providers: [QuestionsService, {
				provide: ActivatedRoute, useValue: { snapshot: { params: { page: 1, size: 10 } } }
			}]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(QuestionsTableComponent);
		component = fixture.componentInstance;
		debugElement = fixture.debugElement;
		questionsService = TestBed.get(QuestionsService);
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
		component.page = {
			content: [],
			number: 0,
			size: 10,
			totalPages: 0,
			last: true,
			first: true
		};

		fixture.detectChanges();

		const trElement: HTMLTableRowElement = debugElement.query(By.css('table tbody tr')).nativeElement;

		expect(trElement.textContent).toEqual('No Data');
	});

	it('should show questions', async(() => {
		const spy = spyOn(questionsService, 'findAllQuestions').and.returnValue(of(new HttpResponse({
			body: {
				content: [
					{
						id: 1, text: 'Question A', answerA: 'Answer A', answerB: 'Answer B',
						answerC: 'Answer C', answerD: 'Answer D', correctAnswer: Answer.A, points: Points.TEN, quiz: { id: 1, name: 'Quiz' }
					}, {
						id: 2, text: 'Question B', answerA: 'Answer A', answerB: 'Answer B',
						answerC: 'Answer C', answerD: 'Answer D', correctAnswer: Answer.A, points: Points.TEN, quiz: { id: 1, name: 'Quiz' }
					}], size: 10, number: 0, totalPages: 1, last: true, first: true
			}
		})));

		fixture.whenStable().then(() => {
			fixture.detectChanges();

			const trElements: HTMLTableRowElement[] = debugElement.queryAll(By.css('table tbody tr')).map((el) => el.nativeElement);

			expect(trElements.length).toEqual(2);
			expect(trElements[0].innerHTML).toContain('<td>Question A</td>');
			expect(trElements[1].innerHTML).toContain('<td>Question B</td>');

			expect(spy.calls.first().args[0]).toEqual({ page: 1, size: 10, sort: 'id' });
		});

		component.ngOnInit();
	}));

	it('should delete question by id', async(() => {
		const spyQuestionsServiceDeleteQuestionById = spyOn(questionsService, 'deleteQuestionById').and.returnValue(of(new HttpResponse()));
		const spyAlert = spyOn(window, 'alert');
		const spyQuestionsSericefindAllQuestions = spyOn(questionsService, 'findAllQuestions').and.returnValue(of(new HttpResponse({
			body: {
				content: [
					{
						id: 1, text: 'Question A', answerA: 'Answer A', answerB: 'Answer B',
						answerC: 'Answer C', answerD: 'Answer D', correctAnswer: Answer.A, points: Points.TEN, quiz: { id: 1, name: 'Quiz' }
					}, {
						id: 2, text: 'Question B', answerA: 'Answer A', answerB: 'Answer B',
						answerC: 'Answer C', answerD: 'Answer D', correctAnswer: Answer.A, points: Points.TEN, quiz: { id: 1, name: 'Quiz' }
					}], size: 10, number: 0, totalPages: 1, last: true, first: true
			}
		})));

		fixture.whenStable().then(() => {
			fixture.detectChanges();

			expect(spyQuestionsServiceDeleteQuestionById.calls.first().args[0]).toEqual(1);
			expect(spyAlert.calls.first().args[0]).toEqual('Your Data Has Been Successfully Deleted.');
			expect(spyQuestionsSericefindAllQuestions.calls.first().args[0]).toEqual({ page: 1, size: 10, sort: 'id' });
			expect(component.page.content.length).toEqual(2);
		});

		component.deleteQuestionById(1);
	}));

	it('should navigate to "/questions/form/1"', () => {
		const spy = spyOn(router, 'navigateByUrl');

		component.findQuestionById(1);

		expect(spy.calls.first().args[0]).toEqual('/questions/form/1');
	});

	afterEach(() => {
		fixture = null;
		component = null;
		debugElement = null;
		questionsService = null;
		router = null;
	});

});