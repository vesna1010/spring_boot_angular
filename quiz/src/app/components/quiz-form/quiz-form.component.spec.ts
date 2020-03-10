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

    afterEach(() => {
        fixture = null;
        component = null;
        debugElement = null;
        quizzesService = null;
        activatedRoute = null;
        router = null;
    });

    it('should create component', () => {
        expect(component).toBeDefined();
    });

    it('should show "Loading data. Please wait..."', () => {
        fixture.detectChanges();

        expect(debugElement.query(By.css('div')).nativeElement.textContent).toEqual('Loading data. Please wait...');
    });

    it('should show empty form', async(() => {
        component.quiz = { id: null, name: null };

        fixture.detectChanges();

        fixture.whenStable().then(() => {
            fixture.detectChanges();

            expect(debugElement.query(By.css('#id')).nativeElement.value).toEqual('');
            expect(debugElement.query(By.css('#name')).nativeElement.value).toEqual('');
            expect(debugElement.query(By.css('button')).nativeElement.textContent).toEqual('Save');
        });

    }));

    it('should show form with quiz', async(() => {
        component.quiz = { id: 1, name: 'Quiz' };

        fixture.detectChanges();

        fixture.whenStable().then(() => {
            fixture.detectChanges();

            expect(debugElement.query(By.css('#id')).nativeElement.value).toEqual('1');
            expect(debugElement.query(By.css('#name')).nativeElement.value).toEqual('Quiz');
            expect(debugElement.query(By.css('button')).nativeElement.textContent).toEqual('Update');
        });

    }));

    it('should init quiz', async(() => {
        const spy = spyOn(quizzesService, 'findQuizById').and.returnValue(of(new HttpResponse({ body: { id: 1, name: 'Quiz' } })));

        fixture.detectChanges();

        fixture.whenStable().then(() => {
            fixture.detectChanges();

            expect(spy).toHaveBeenCalledWith(1);
            expect(component.quiz).toEqual({ id: 1, name: 'Quiz' });
        });

        component.ngOnInit();
    }));

    it('should show error message', async(() => {
        const spy1 = spyOn(quizzesService, 'findQuizById').and.returnValue(throwError({ error: { message: 'No quiz with id 1' } }));
        const spy2 = spyOn(window, 'alert');
        const spy3 = spyOn(router, 'navigateByUrl');

        fixture.whenStable().then(() => {
            fixture.detectChanges();

            expect(spy1).toHaveBeenCalledWith(1);
            expect(spy2).toHaveBeenCalledWith('No quiz with id 1');
            expect(spy3).toHaveBeenCalledWith('/quizzes/form');
        });

        component.ngOnInit();
    }));

    it('should save quiz', async(() => {
        component.quiz = { id: null, name: 'Quiz' };

        const spy1 = spyOn(quizzesService, 'saveQuiz').and.returnValue(of(new HttpResponse({ body: { id: 1, name: 'Quiz' } })));
        const spy2 = spyOn(window, 'alert');

        fixture.detectChanges();

        fixture.whenStable().then(() => {
            fixture.detectChanges();

            expect(spy1).toHaveBeenCalledWith({ id: null, name: 'Quiz' });
            expect(spy2).toHaveBeenCalledWith('Your Data Has Been Successfully Saved.');
            expect(component.quiz).toEqual({ id: 1, name: 'Quiz' });
        });

        component.saveQuiz();
    }));

    it('should update quiz', async(() => {
        component.quiz = { id: 1, name: 'Quiz' };

        const spy1 = spyOn(quizzesService, 'updateQuiz').and.returnValue(of(new HttpResponse({ body: { id: 1, name: 'Quiz' } })));
        const spy2 = spyOn(window, 'alert');

        fixture.detectChanges();

        fixture.whenStable().then(() => {
            fixture.detectChanges();

            expect(spy1).toHaveBeenCalledWith({ id: 1, name: 'Quiz' });
            expect(spy2).toHaveBeenCalledWith('Your Data Has Been Successfully Updated.');
            expect(component.quiz).toEqual({ id: 1, name: 'Quiz' });
        });

        component.updateQuiz();
    }));

});
