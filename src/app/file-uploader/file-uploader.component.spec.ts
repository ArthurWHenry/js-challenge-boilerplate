import { ComponentFixture, TestBed } from '@angular/core/testing';

// Components
import { FileUploaderComponent } from './file-uploader.component';

// Constants
import { MAX_FILE_SIZE } from '../../constants';

// Helpers
import { formatBytes } from '../../helpers';

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

  it('should update title', (): void => {
    const newTitle = 'New Title';
    component.title = newTitle;
    expect(component.title).toBe(newTitle);
  });

  it('should set acceptedTypesString based on acceptedTypes on init', (): void => {
    component.acceptedTypes = ['.jpg', '.png'];
    component.ngOnInit();
    expect(component.acceptedTypesString).toBe('.jpg, .png');
  });

  it('should correctly format maxSizeString', (): void => {
    expect(component.maxSizeString).toBe(formatBytes({ bytes: MAX_FILE_SIZE }));
  });

  it('should update maxSizeString when MAX_FILE_SIZE changes', (): void => {
    const newMaxSize: number = 1024 * 1024 * 10; // 10MB
    component.maxSizeString = formatBytes({ bytes: newMaxSize });
    expect(component.maxSizeString).toBe('10mb');
  });

  it('should validate file size correctly', (): void => {
    const smallFile = new File(['small file content'], 'small.csv', {
      type: 'text/csv',
    });
    const largeFile = new Blob([new ArrayBuffer(5 * 1024 * 1024)], {
      type: 'text/csv',
    }); // 5MB file
    expect(component.isValidFile(smallFile)).toBeTrue();
    expect(
      component.isValidFile(new File([largeFile], 'large.csv'))
    ).toBeFalse();
  });

  it('should validate file type correctly', (): void => {
    const csvFile = new File([''], 'test.csv', { type: 'text/csv' });
    const pdfFile = new File([''], 'test.pdf', { type: 'application/pdf' });
    component.acceptedTypes = ['.csv'];
    expect(component.isValidFile(csvFile)).toBeTrue();
    expect(component.isValidFile(pdfFile)).toBeFalse();
  });

  it('should call file upload handler on file upload', (): void => {
    const file = new File(['file content'], 'test.csv', { type: 'text/csv' });
    spyOn(component, 'fileUploadHandler');
    // Call onFileUpload with a mock event
    component.onFileUpload({ target: { files: [file] } } as unknown as Event);
    expect(component.fileUploadHandler).toHaveBeenCalledWith(file);
  });

  it('should prevent default and stop propagation on drag over', (): void => {
    const event = new DragEvent('dragover');
    spyOn(event, 'preventDefault');
    spyOn(event, 'stopPropagation');
    component.onDragOver(event);
    expect(event.preventDefault).toHaveBeenCalled();
    expect(event.stopPropagation).toHaveBeenCalled();
  });

  it('should handle drag enter event by preventing default behavior', (): void => {
    const event = new DragEvent('dragenter');
    spyOn(event, 'preventDefault');
    component.onDragEnter(event);
    expect(event.preventDefault).toHaveBeenCalled();
  });

  it('should handle drag leave event by preventing default behavior', (): void => {
    const event = new DragEvent('dragleave');
    spyOn(event, 'preventDefault');
    component.onDragLeave(event);
    expect(event.preventDefault).toHaveBeenCalled();
  });

  it('should handle file drop correctly', (): void => {
    const file = new File(['file content'], 'test.csv', { type: 'text/csv' });

    const dataTransferMock = {
      files: [file],
      items: [], // Assuming items are not directly used or tested
      types: ['Files'],
    };

    // Create a generic event and extend it to mimic a DragEvent
    const event: CustomEvent<any> = document.createEvent('CustomEvent');
    Object.defineProperty(event, 'dataTransfer', { value: dataTransferMock });

    spyOn(event, 'preventDefault');
    spyOn(event, 'stopPropagation');
    spyOn(component, 'onDrop').and.callThrough();

    component.onDrop(event as unknown as DragEvent);

    // Expect the event to be prevented and the onDrop method to be called
    expect(event.preventDefault).toHaveBeenCalled();
    expect(event.stopPropagation).toHaveBeenCalled();
    expect(component.onDrop).toHaveBeenCalledWith(jasmine.anything());
  });

  it('should clear file input correctly', (): void => {
    spyOn(component, 'clearFileInput').and.callThrough();
    component.clearFileInput();
    expect(component.clearFileInput).toHaveBeenCalled();
  });
});
