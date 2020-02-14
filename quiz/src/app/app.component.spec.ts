import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AppComponent } from './app.component';

describe('AppComponentTest', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let router: Router;
  let location: Location;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    router = TestBed.get(Router);
    location = TestBed.get(Location);
  });

  it('should create component', () => {
    expect(component).toBeDefined();
  });

  it('should show quizzes', () => {
    router.navigateByUrl('/quizzes').then(() => {
      expect(location.path).toBe('quizzes');
    });
  });

  it('should show questions', () => {
    router.navigateByUrl('/questions').then(() => {
      expect(location.path).toBe('questions-table');
    });
  });

  it('should show questions with page and size', () => {
    router.navigateByUrl('/questions/1/10').then(() => {
      expect(location.path).toBe('questions/:page/:size');
    });
  });

  it('should show quizzes form', () => {
    router.navigateByUrl('/quizzes/form').then(() => {
      expect(location.path).toBe('quizzes/form');
    });
  });

  it('should show quizzes form with quiz', () => {
    router.navigateByUrl('/quizzes/form/1').then(() => {
      expect(location.path).toBe('quizzes/form/:id');
    });
  });

  it('should show questions form', () => {
    router.navigateByUrl('/questions/form').then(() => {
      expect(location.path).toBe('questions/form');
    });
  });

  it('should show questions form with question', () => {
    router.navigateByUrl('/questions/form/1').then(() => {
      expect(location.path).toBe('questions/form/:id');
    });
  });

  it('should show play', () => {
    router.navigateByUrl('/play').then(() => {
      expect(location.path).toBe('play');
    });
  });

});
