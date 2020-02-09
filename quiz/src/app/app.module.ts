import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { QuizzesTableComponent } from './components/quizzes-table/quizzes-table.component';
import { QuizFormComponent } from './components/quiz-form/quiz-form.component';
import { QuestionsTableComponent } from './components/questions-table/questions-table.component';
import { HomeComponent } from './components/home/home.component';
import { PlayQuizComponent } from './components/play-quiz/play-quiz.component';
import { QuizzesService } from './services/quizzes.service';
import { QuestionsService } from './services/questions.service';
import { QuestionFormComponent } from './components/question-form/question-form.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ShowQuestionComponent } from './components/show-question/show-question.component';
import { TableStyleDirective } from './directives/table-style.directive';
import { PaginationComponent } from './components/pagination/pagination.component';
import { ToArrayPipe } from './pipes/toArray.pipe';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent, QuizzesTableComponent, QuizFormComponent, QuestionsTableComponent,
    QuestionFormComponent, PlayQuizComponent, HomeComponent, PageNotFoundComponent,
    ShowQuestionComponent, TableStyleDirective, PaginationComponent, ToArrayPipe
  ],
  imports: [
    BrowserModule, FormsModule, HttpClientModule, AppRoutingModule
  ],
  providers: [QuizzesService, QuestionsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
