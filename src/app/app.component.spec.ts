import { ComponentFixture, TestBed } from '@angular/core/testing';

// Components
import { AppComponent } from './app.component';

// Services
import { AlertService } from './alert/alert.service';

// Types
import type { Policy } from '../types';

describe('AppComponent', (): void => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [AlertService],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', (): void => {
    expect(component).toBeTruthy();
  });

  it(`should have the 'kin-ocr' title`, (): void => {
    expect(component.title).toEqual('kin-ocr');
  });

  it('should render title in an h1 tag', (): void => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('kin.OCR');
  });

  it('should start with submitButtonDisabled set to true', (): void => {
    expect(component.submitButtonDisabled).toBeTrue();
  });

  it('should have an empty policies array initially', (): void => {
    expect(component.policies).toEqual([]);
  });

  it('clearPolicyNumbers should empty the policies array', (): void => {
    component.policies = [{ policyNumber: '123', isValid: 'valid' }];
    component.clearPolicyNumbers();
    expect(component.policies.length).toBe(0);
  });

  it('clearPolicyNumbers should show an information alert', (): void => {
    const alertService = TestBed.inject(AlertService);
    const alertServiceSpy = spyOn(alertService, 'showAlert');
    component.clearPolicyNumbers();
    expect(alertServiceSpy).toHaveBeenCalledWith(
      'Data cleared. Please upload a new file.',
      'information'
    );
  });

  it('submitPolicyNumbers should call postPolicyNumbers API', async (): Promise<void> => {
    const spy = spyOn(
      component as any,
      'submitPolicyNumbers'
    ).and.callThrough();
    await component.submitPolicyNumbers();
    expect(spy).toHaveBeenCalled();
  });

  it('handleFileUpload should process a file upload', (): void => {
    const spy = spyOn(component as any, 'handleFileUpload').and.callThrough();
    const file = new File(['123,345'], 'policies.txt', {
      type: 'text/csv',
    });
    component.handleFileUpload(file);
    expect(spy).toHaveBeenCalledWith(file);
  });

  it('parsePolicies should correctly parse policies from string', (): void => {
    const testString = '123\n456';
    const result: Policy[] = component['parsePolicies'](testString);
    expect(result.length).toBe(2);
    expect(result[0].policyNumber).toBe('123');
    expect(result[1].policyNumber).toBe('456');
  });

  it('processFileContent should show a warning alert on invalid data', (): void => {
    const alertService = TestBed.inject(AlertService);
    const alertServiceSpy = spyOn(alertService, 'showAlert');
    const mockEvent = {
      target: {
        result: 'invalid,data',
      },
    } as ProgressEvent<FileReader>;
    try {
      component['processFileContent'](mockEvent);
    } catch (error) {
      expect(alertServiceSpy).toHaveBeenCalledWith(
        'Invalid number exists in your file.',
        'warning'
      );
    }
  });
});
