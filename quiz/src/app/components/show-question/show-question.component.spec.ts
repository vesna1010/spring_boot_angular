import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ShowQuestionComponent } from './show-question.component';
import { Answer } from 'src/app/enums/answer';
import { Points } from 'src/app/enums/points';

describe('ShowQuestionComponentTest', () => {
	let fixture: ComponentFixture<ShowQuestionComponent>;
	let component: ShowQuestionComponent;
	let debugElement: DebugElement;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ShowQuestionComponent]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ShowQuestionComponent);
		component = fixture.componentInstance;
		debugElement = fixture.debugElement;
	});

	it('should create component', () => {
		expect(component).toBeDefined();
	});

	it('should show question', () => {
		const questionTextElement: HTMLHeadingElement = debugElement.query(By.css('#questionText')).nativeElement;
		const answerAElement: HTMLDivElement = debugElement.query(By.css('#A')).nativeElement.lastChild;
		const answerBElement: HTMLDivElement = debugElement.query(By.css('#B')).nativeElement.lastChild;
		const answerCElement: HTMLDivElement = debugElement.query(By.css('#C')).nativeElement.lastChild;
		const answerDElement: HTMLDivElement = debugElement.query(By.css('#D')).nativeElement.lastChild;

		component.question = {
			id: 1, text: 'Question A', answerA: 'Answer A', answerB: 'Answer B',
			answerC: 'Answer C', answerD: 'Answer D', correctAnswer: Answer.A, points: Points.TEN, quiz: { id: 1, name: 'Quiz' }
		};

		fixture.detectChanges();

		expect(questionTextElement.textContent).toEqual('Question A');
		expect(answerAElement.textContent).toEqual('Answer A');
		expect(answerBElement.textContent).toEqual('Answer B');
		expect(answerCElement.textContent).toEqual('Answer C');
		expect(answerDElement.textContent).toEqual('Answer D');
	});

	it('should show correct answer', () => {
		const questionTextElement: HTMLHeadingElement = debugElement.query(By.css('#questionText')).nativeElement;
		const answerAElement: HTMLDivElement = debugElement.query(By.css('#A')).nativeElement.lastChild;
		const answerBElement: HTMLDivElement = debugElement.query(By.css('#B')).nativeElement.lastChild;
		const answerCElement: HTMLDivElement = debugElement.query(By.css('#C')).nativeElement.lastChild;
		const answerDElement: HTMLDivElement = debugElement.query(By.css('#D')).nativeElement.lastChild;

		component.question = {
			id: 1, text: 'Question A', answerA: 'Answer A', answerB: 'Answer B',
			answerC: 'Answer C', answerD: 'Answer D', correctAnswer: Answer.A, points: Points.TEN, quiz: { id: 1, name: 'Quiz' }
		};

		spyOn(document, 'getElementById').and.callFake((id: string) => {
			if (id === 'questionText') {
				return questionTextElement;
			} else if (id === 'A') {
				return answerAElement;
			}

			return null;
		});
		spyOn(document, 'querySelectorAll').and.returnValue([answerAElement, answerBElement, answerCElement, answerDElement]);

		component.eventEmmiter.subscribe((points: number) => {
			expect(points).toEqual(10);
		});

		component.checkAnswer(Answer.A);

		fixture.detectChanges();

		expect(questionTextElement.textContent).toEqual('CORRECT');
		expect(questionTextElement.classList).toContain('text-success');
		expect(answerAElement.classList).toContain('bg-success');
		expect(answerAElement.classList).toContain('disableClick');
		expect(answerBElement.classList).toContain('disableClick');
		expect(answerCElement.classList).toContain('disableClick');
		expect(answerDElement.classList).toContain('disableClick');
	});

	it('should show incorrect answer', () => {
		const questionTextElement: HTMLHeadingElement = debugElement.query(By.css('#questionText')).nativeElement;
		const answerAElement: HTMLDivElement = debugElement.query(By.css('#A')).nativeElement.lastChild;
		const answerBElement: HTMLDivElement = debugElement.query(By.css('#B')).nativeElement.lastChild;
		const answerCElement: HTMLDivElement = debugElement.query(By.css('#C')).nativeElement.lastChild;
		const answerDElement: HTMLDivElement = debugElement.query(By.css('#D')).nativeElement.lastChild;

		component.question = {
			id: 1, text: 'Question A', answerA: 'Answer A', answerB: 'Answer B',
			answerC: 'Answer C', answerD: 'Answer D', correctAnswer: Answer.A, points: Points.TEN, quiz: { id: 1, name: 'Quiz' }
		};

		spyOn(document, 'getElementById').and.callFake((id: string) => {
			if (id === 'questionText') {
				return questionTextElement;
			} else if (id === 'A') {
				return answerAElement;
			} else if (id === 'B') {
				return answerBElement;
			}

			return null;
		});
		spyOn(document, 'querySelectorAll').and.returnValue([answerAElement, answerBElement, answerCElement, answerDElement]);

		component.checkAnswer(Answer.B);

		fixture.detectChanges();

		expect(questionTextElement.textContent).toEqual('INCORRECT');
		expect(questionTextElement.classList).toContain('text-danger');
		expect(answerAElement.classList).toContain('bg-success');
		expect(answerBElement.classList).toContain('bg-danger');
		expect(answerAElement.classList).toContain('disableClick');
		expect(answerBElement.classList).toContain('disableClick');
		expect(answerCElement.classList).toContain('disableClick');
		expect(answerDElement.classList).toContain('disableClick');
	});

	it('should remove class disableClick', () => {
		const answerAElement: HTMLDivElement = debugElement.query(By.css('#A')).nativeElement.lastChild;
		const answerBElement: HTMLDivElement = debugElement.query(By.css('#B')).nativeElement.lastChild;
		const answerCElement: HTMLDivElement = debugElement.query(By.css('#C')).nativeElement.lastChild;
		const answerDElement: HTMLDivElement = debugElement.query(By.css('#D')).nativeElement.lastChild;

		answerAElement.classList.add('disableClick');
		answerBElement.classList.add('disableClick');
		answerCElement.classList.add('disableClick');
		answerDElement.classList.add('disableClick');

		spyOn(document, 'querySelectorAll').and.returnValue([answerAElement, answerBElement, answerCElement, answerDElement]);

		component.ngOnChanges();

		expect(answerAElement.classList).not.toContain('disableClick');
		expect(answerBElement.classList).not.toContain('disableClick');
		expect(answerCElement.classList).not.toContain('disableClick');
		expect(answerDElement.classList).not.toContain('disableClick');
	});

	afterEach(() => {
		fixture = null;
		component = null;
		debugElement = null;
	});

});