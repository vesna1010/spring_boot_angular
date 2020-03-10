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

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule, RouterTestingModule],
			declarations: [QuestionsTableComponent, PaginationComponent],
			providers: [QuestionsService, {
				provide: ActivatedRoute, useValue: { paramMap: of({ page: 1, size: 10, get(key: string) { return this[key]; } }) }
			}]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(QuestionsTableComponent);
		component = fixture.componentInstance;
		debugElement = fixture.debugElement;
		questionsService = TestBed.get(QuestionsService);
		router = TestBed.get(Router);
	});

	afterEach(() => {
		fixture = null;
		component = null;
		debugElement = null;
		questionsService = null;
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
		component.page = { content: [], number: 0, size: 10, totalPages: 0, last: true, first: true };

		fixture.detectChanges();

		expect(debugElement.query(By.css('td')).nativeElement.textContent).toEqual('No Data');
	});

	it('should show questions', () => {
		component.page = {
			content: [
				{
					id: 1, text: 'Question A', answerA: 'Answer A', answerB: 'Answer B',
					answerC: 'Answer C', answerD: 'Answer D', correctAnswer: Answer.A, points: Points.TEN, quiz: { id: 1, name: 'Quiz' }
				}, {
					id: 2, text: 'Question B', answerA: 'Answer A', answerB: 'Answer B',
					answerC: 'Answer C', answerD: 'Answer D', correctAnswer: Answer.A, points: Points.TEN, quiz: { id: 1, name: 'Quiz' }
				}], size: 10, number: 0, totalPages: 1, last: true, first: true
		};

		fixture.detectChanges();

		const debugElements: DebugElement[] = debugElement.queryAll(By.css('td'));

		expect(debugElements[1].nativeElement.textContent).toEqual('Question A');
		expect(debugElements[11].nativeElement.textContent).toEqual('Question B');
	});

	it('should init questions', async(() => {
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

			expect(spy).toHaveBeenCalledWith({ page: 1, size: 10, sort: 'id' });
			expect(component.page.content.length).toEqual(2);
		});

		component.ngOnInit();
	}));

	it('should delete question by id', async(() => {
		const spy1 = spyOn(questionsService, 'deleteQuestionById').and.returnValue(of(new HttpResponse()));
		const spy2 = spyOn(window, 'alert');
		const spy3 = spyOn(questionsService, 'findAllQuestions').and.returnValue(of(new HttpResponse({
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

			expect(spy1).toHaveBeenCalledWith(1);
			expect(spy2).toHaveBeenCalledWith('Your Data Has Been Successfully Deleted.');
			expect(spy3).toHaveBeenCalledWith({ page: 1, size: 10, sort: 'id' });
			expect(component.page.content.length).toEqual(2);
		});

		component.deleteQuestionById(1);
	}));

});
