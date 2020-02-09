import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { QuizzesTableComponent } from './components/quizzes-table/quizzes-table.component';
import { QuestionsTableComponent } from './components/questions-table/questions-table.component';
import { QuizFormComponent } from './components/quiz-form/quiz-form.component';
import { QuestionFormComponent } from './components/question-form/question-form.component';
import { PlayQuizComponent } from './components/play-quiz/play-quiz.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const appRoutes: Routes = [
	{ path: '', component: HomeComponent, data: { title: 'Home' } },
	{
		path: 'play', component: PlayQuizComponent, data: { title: 'Play Quiz' }
	},
	{
		path: 'quizzes',
		children: [{
			path: '', component: QuizzesTableComponent, data: { title: 'Quizzes' }
		}, {
			path: 'form', data: { title: 'Quiz Form' },
			children: [
				{ path: '', component: QuizFormComponent },
				{ path: ':id', component: QuizFormComponent }
			]
		}]
	}, {
		path: 'questions', children: [
			{
				path: '', component: QuestionsTableComponent, data: { title: 'Questions' },
			}, {
				path: 'form', data: { title: 'Question Form' },
				children: [{
					path: '', component: QuestionFormComponent
				}, {
					path: ':id', component: QuestionFormComponent
				}]
			}, {
				path: ':page/:size', component: QuestionsTableComponent, data: { title: 'Questions' },
			}
		]
	},
	{ path: '**', component: PageNotFoundComponent, data: { title: 'Page Not Found' } }
];

@NgModule({
	imports: [RouterModule.forRoot(appRoutes)],
	exports: [RouterModule]
})
export class AppRoutingModule {
}