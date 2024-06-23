import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileUploaderComponent } from './file-uploader.component';

describe('FileUploaderComponent', (): void => {
  let component: FileUploaderComponent;
  let fixture: ComponentFixture<FileUploaderComponent>;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [FileUploaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FileUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', (): void => {
    expect(component).toBeTruthy();
  });

  it('should have default title', (): void => {
    expect(component.title).toBe('Upload a file');
  });

  it('should have default accepted types', (): void => {
    expect(component.acceptedTypes).toEqual(['.csv']);
  });

  it('should have default file upload handler', (): void => {
    expect(component.fileUploadHandler).toBeDefined();
  });

  it('should update title', (): void => {
    const newTitle = 'New Title';
    component.title = newTitle;
    expect(component.title).toBe(newTitle);
  });

  it('should update accepted types', (): void => {
    const newAcceptedTypes: string[] = ['.csv', '.txt'];
    component.acceptedTypes = newAcceptedTypes;
    expect(component.acceptedTypes).toEqual(newAcceptedTypes);
  });

  it('should call file upload handler on file upload', () => {
    const file = new File(['file content'], 'test.csv', { type: 'text/csv' });
    spyOn(component, 'fileUploadHandler');
    component.onFileUpload({ target: { files: [file] } } as unknown as Event);
    expect(component.fileUploadHandler).toHaveBeenCalledWith(file);
  });
});
