import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

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

  it('should display "No Data to Display" message when table is empty', (): void => {
    const fixture: ComponentFixture<PolicyTableComponent> =
      TestBed.createComponent(PolicyTableComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.table__wrapper')).toBeTruthy();
    expect(compiled.querySelector('.table__wrapper')?.textContent).toContain(
      'No Data to Display'
    );
  });

  it('should not display "No Data to Display" when table has data', (): void => {
    component.tableData = [{ policyNumber: '457508000', isValid: 'valid' }];
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.no-data')).toBeNull();
  });

  it('should display correct number of rows for input data', (): void => {
    component.tableData = [
      { policyNumber: '457508000', isValid: 'valid' },
      { policyNumber: '664371495', isValid: 'error' },
    ];
    fixture.detectChanges();
    const rows: DebugElement[] = fixture.debugElement.queryAll(
      By.css('[data-testid="table-row"]')
    );
    expect(rows.length).toEqual(2);
  });

  it('should display policy number and result in the table', (): void => {
    component.tableData = [{ policyNumber: '664371495', isValid: 'error' }];
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('664371495');
    expect(compiled.textContent).toContain('error');
  });
});
