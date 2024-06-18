import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', (): void => {
  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });

  it('should create the app', (): void => {
    const fixture: ComponentFixture<AppComponent> =
      TestBed.createComponent(AppComponent);
    const app: AppComponent = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'kin-ocr' title`, (): void => {
    const fixture: ComponentFixture<AppComponent> =
      TestBed.createComponent(AppComponent);
    const app: AppComponent = fixture.componentInstance;
    expect(app.title).toEqual('kin-ocr');
  });

  it('should render title', (): void => {
    const fixture: ComponentFixture<AppComponent> =
      TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain(
      'Hello, Kin OCR'
    );
  });

  it('should have a file upload input', (): void => {
    const fixture: ComponentFixture<AppComponent> =
      TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.file-upload-input')).toBeTruthy();
  });

  it('should have the table container class visible', (): void => {
    const fixture: ComponentFixture<AppComponent> =
      TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.table-container')).toBeTruthy();
  });

  it('should display "No policy numbers available" message when table is empty', (): void => {
    const fixture: ComponentFixture<AppComponent> =
      TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.table-container')).toBeTruthy();
    expect(compiled.querySelector('.table-container')?.textContent).toContain(
      'No policy numbers available.'
    );
  });

  it('should display an error message when an invalid file type is uploaded', (): void => {
    spyOn(window, 'alert');

    const fixture: ComponentFixture<AppComponent> =
      TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const fileInput = compiled.querySelector(
      '.file-upload-input'
    ) as HTMLInputElement;
    const invalidFile = new File([''], 'invalid.txt', { type: 'text/plain' });

    // Create a DataTransfer object to simulate the file input event
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(invalidFile);

    // Assigning the file to the input element and triggering the upload.
    fileInput.files = dataTransfer.files;
    fileInput.dispatchEvent(new Event('change', { bubbles: true }));

    fixture.detectChanges();

    // Verify that the error message is displayed
    expect(window.alert).toHaveBeenCalledWith(
      'Invalid file type. Please select a CSV file.'
    );
  });

  it('should successfully display the numbers from the CSV file', (): void => {
    const fixture: ComponentFixture<AppComponent> =
      TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    // Mocking FileReader API since it's event based.
    spyOn(window as any, 'FileReader').and.returnValue({
      readAsText: function (file: File): void {
        this.onload({ target: { result: '1,2,3,4,5' } });
      },
      onload: null,
    });

    const compiled = fixture.nativeElement as HTMLElement;
    const fileInput = compiled.querySelector(
      '.file-upload-input'
    ) as HTMLInputElement;
    const validFile = new File(['1,2,3,4,5'], 'valid.csv', {
      type: 'text/csv',
    });

    // Create a DataTransfer object to simulate the file input event
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(validFile);

    // Assigning the file to the input element and triggering the upload.
    fileInput.files = dataTransfer.files;
    fileInput.dispatchEvent(new Event('change', { bubbles: true }));

    fixture.detectChanges();

    // Verify that the policy numbers are displayed
    const table: HTMLTableElement | null = compiled.querySelector('table');
    expect(table).toBeTruthy();

    const noData: Element | null = compiled.querySelector('#noData');
    expect(noData).toBeFalsy();

    if (!table) {
      return fail('Table not found');
    }

    // Verify that the numbers are displayed in the table
    const tableRows: NodeListOf<Element> = table.querySelectorAll('tbody tr');
    expect(tableRows.length).toBe(5);
    expect(tableRows[0].textContent).toContain('1');
    expect(tableRows[1].textContent).toContain('2');
    expect(tableRows[2].textContent).toContain('3');
    expect(tableRows[3].textContent).toContain('4');
  });

  it('should throw an error for invalid file contents', (): void => {
    const fixture: ComponentFixture<AppComponent> =
      TestBed.createComponent(AppComponent);
    const app: AppComponent = fixture.componentInstance;
    fixture.detectChanges();

    // Mocking FileReader API since it's event based.
    spyOn(window as any, 'FileReader').and.returnValue({
      readAsText: function (file: File): void {
        this.onload({ target: { result: '1,2,a,4,5' } });
      },
      onload: null,
    });

    const compiled = fixture.nativeElement as HTMLElement;
    const fileInput = compiled.querySelector(
      '.file-upload-input'
    ) as HTMLInputElement;
    const invalidFile = new File(['1,2,a,4,5'], 'valid.csv', {
      type: 'text/csv',
    });

    // Create a DataTransfer object to simulate the file input event
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(invalidFile);

    // Assigning the file to the input element and triggering the upload.
    fileInput.files = dataTransfer.files;
    fileInput.dispatchEvent(new Event('change', { bubbles: true }));

    // The FileReader should throw an error and the policy numbers should be empty.
    expect(app.onFileSelected).toThrowError();
    expect(app.policyNumbers.length).toBe(0);
  });
});
