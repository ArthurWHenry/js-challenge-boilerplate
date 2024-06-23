import { ComponentFixture, TestBed } from '@angular/core/testing';

// Components
import { PolicyTableComponent } from './policy-table.component';

describe('PolicyTableComponent', (): void => {
  let component: PolicyTableComponent;
  let fixture: ComponentFixture<PolicyTableComponent>;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [PolicyTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PolicyTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', (): void => {
    expect(component).toBeTruthy();
  });

  it('should have the table container class visible', (): void => {
    const fixture: ComponentFixture<PolicyTableComponent> =
      TestBed.createComponent(PolicyTableComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.table__wrapper')).toBeTruthy();
  });

  it('should display "No policy numbers available" message when table is empty', (): void => {
    const fixture: ComponentFixture<PolicyTableComponent> =
      TestBed.createComponent(PolicyTableComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.table__wrapper')).toBeTruthy();
    expect(compiled.querySelector('.table__wrapper')?.textContent).toContain(
      'No Data to Display'
    );
  });
});
