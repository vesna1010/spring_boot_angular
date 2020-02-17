import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IPage } from 'src/app/models/page';
import { IPageable } from 'src/app/models/pageable';
import { QuestionsService } from 'src/app/services/questions.service';
import { Points } from 'src/app/enums/points';
import { IQuestion } from 'src/app/models/question';

@Component({
	templateUrl: './questions-table.component.html'
})
export class QuestionsTableComponent implements OnInit {
	Points = Points;
	page: IPage;

	constructor(private questionsService: QuestionsService, private router: Router,
		private activatedRoute: ActivatedRoute) { }

	ngOnInit(): void {
		const page: number = Number(this.activatedRoute.snapshot.params.page) || 0;
		const size: number = Number(this.activatedRoute.snapshot.params.size) || 10;
		const pageable: IPageable = { page, size, sort: 'id' };

		this.questionsService.findAllQuestions(pageable).subscribe(
			(response) => {
				this.page = response.body;
			})
	}

	deleteQuestionById(id: number): void {
		this.questionsService.deleteQuestionById(id).subscribe(
			() => {
				alert('Your Data Has Been Successfully Deleted.');
				this.ngOnInit();
			});
	}

	findQuestionById(id: number): void {
		this.router.navigateByUrl('/questions/form/' + id);
	}

	getKey(index: number, question: IQuestion) {
		return question.id;
	}

}