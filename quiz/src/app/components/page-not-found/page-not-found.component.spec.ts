import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { PageNotFoundComponent } from './page-not-found.component';

describe('PageNotFoundComponentTest', () => {
	let fixture: ComponentFixture<PageNotFoundComponent>;
	let component: PageNotFoundComponent;
	let debugElement: DebugElement;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [PageNotFoundComponent]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(PageNotFoundComponent);
		component = fixture.componentInstance;
		debugElement = fixture.debugElement;
	});

	it('should create component', () => {
		expect(component).toBeDefined();
	});

	it('should show "Page Not Found"', () => {
		fixture.detectChanges();

		const divElement: HTMLDivElement = debugElement.query(By.css('div')).nativeElement;

		expect(divElement.textContent).toEqual('Page Not Found');
	});

	afterEach(() => {
		fixture = null;
		component = null;
		debugElement = null;
	});

});