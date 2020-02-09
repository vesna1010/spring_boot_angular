import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { PaginationComponent } from './pagination.component';

describe('PaginationComponentTest', () => {
	let fixture: ComponentFixture<PaginationComponent>;
	let component: PaginationComponent;
	let debugElement: DebugElement;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			declarations: [PaginationComponent]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(PaginationComponent);
		component = fixture.componentInstance;
		debugElement = fixture.debugElement;
	});

	it('should create component', () => {
		expect(component).toBeDefined();
	});

	it('should show 1, 2, 3', () => {
		component.url = '/questions';
		component.page = {
			content: [], size: 10, number: 0, totalPages: 3, last: false, first: true
		};

		fixture.detectChanges();

		const aElements: HTMLAnchorElement[] = debugElement.queryAll(By.css('a')).map((el) => el.nativeElement);

		expect(aElements.length).toEqual(5);
		expect(aElements[0].textContent).toEqual('Previous');
		expect(aElements[1].textContent).toEqual('1');
		expect(aElements[2].textContent).toEqual('2');
		expect(aElements[3].textContent).toEqual('3');
		expect(aElements[4].textContent).toEqual('Next');

		expect(aElements[0].href).toContain('/questions/-1/10');
		expect(aElements[1].href).toContain('/questions/0/10');
		expect(aElements[2].href).toContain('/questions/1/10');
		expect(aElements[3].href).toContain('/questions/2/10');
		expect(aElements[4].href).toContain('/questions/1/10');

		expect(aElements[0].parentElement.classList).toContain('disabled');
		expect(aElements[1].parentElement.classList).toContain('active');
		expect(aElements[4].parentElement.classList).not.toContain('disabled');
	});

	afterEach(() => {
		fixture = null;
		component = null;
		debugElement = null;
	});

});