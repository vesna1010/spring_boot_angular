import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { QuestionsService } from 'src/app/services/questions.service';
import { PlayQuizComponent } from './play-quiz.component';
import { ShowQuestionComponent } from '../show-question/show-question.component';
import { Points } from 'src/app/enums/points';
import { Answer } from 'src/app/enums/answer';
import { of } from 'rxjs';

describe('PlayQuizComponentTest', () => {
	let fixture: ComponentFixture<PlayQuizComponent>;
	let component: PlayQuizComponent;
	let debugElement: DebugElement;
	let questionsService: QuestionsService;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule, RouterTestingModule],
			declarations: [PlayQuizComponent, ShowQuestionComponent],
			providers: [QuestionsService]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(PlayQuizComponent);
		component = fixture.componentInstance;
		debugElement = fixture.debugElement;
		questionsService = TestBed.get(QuestionsService);
	});

	it('should create component', () => {
		expect(component).toBeDefined();
	});

	it('should show first question', async(() => {
		spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify({ id: 1, name: 'Quiz' }));
		spyOn(questionsService, 'findQuestionsByQuiz').and.returnValue(of(new HttpResponse({
			body: [{
				id: 1, text: 'Question A', answerA: 'Answer A', answerB: 'Answer B',
				answerC: 'Answer C', answerD: 'Answer D', correctAnswer: Answer.A, points: Points.TEN, quiz: { id: 1, name: 'Quiz' }
			}]
		})));

		fixture.detectChanges();

		fixture.whenStable().then(() => {
			fixture.detectChanges();

			const spanElements: HTMLSpanElement[] = debugElement.queryAll(By.css('span')).map((span) => span.nativeElement);
			const questionTextElement: HTMLHeadingElement = debugElement.query(By.css('#questionText')).nativeElement;
			const answerAElement: HTMLDivElement = debugElement.query(By.css('#A')).nativeElement.lastChild;
			const answerBElement: HTMLDivElement = debugElement.query(By.css('#B')).nativeElement.lastChild;
			const answerCElement: HTMLDivElement = debugElement.query(By.css('#C')).nativeElement.lastChild;
			const answerDElement: HTMLDivElement = debugElement.query(By.css('#D')).nativeElement.lastChild;

			expect(spanElements[0].textContent).toEqual('Playing : Quiz');
			expect(spanElements[1].textContent).toEqual('Question : 1');
			expect(spanElements[2].textContent).toEqual('Points : 0');

			expect(questionTextElement.textContent).toEqual('Question A');
			expect(answerAElement.textContent).toEqual('Answer A');
			expect(answerBElement.textContent).toEqual('Answer B');
			expect(answerCElement.textContent).toEqual('Answer C');
			expect(answerDElement.textContent).toEqual('Answer D');

			expect(component.quiz).toEqual({ id: 1, name: 'Quiz' });
		});

		component.ngOnInit();
	}));

	it('should add points', () => {
		component.addPoints(10);

		expect(component.score).toEqual(10);
	});

	it('should set up next question', () => {
		component.nextQuestion();

		expect(component.numberOfQuestion).toEqual(1);
	});

	afterEach(() => {
		fixture = null;
		component = null;
		debugElement = null;
		questionsService = null;
	});

});