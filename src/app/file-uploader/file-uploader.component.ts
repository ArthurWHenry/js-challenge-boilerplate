import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';

// Constants
import { MAX_FILE_SIZE } from '../../constants';

// Helpers
import { formatBytes } from '../../helpers';

// Services
import { AlertService } from '../alert/alert.service';

@Component({
  selector: 'app-file-uploader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './file-uploader.component.html',
  styleUrl: './file-uploader.component.scss',
})
export class FileUploaderComponent {
  // Inject the AlertService
  constructor(private alertService: AlertService) {}

  // Properties
  @Input() acceptedTypes: string[] = ['.csv'];
  @Input() fileUploadHandler: (file: File) => void = (): void => {};
  @Input() title: string = 'Upload a file';
  maxSize: number = MAX_FILE_SIZE;
  maxSizeString: string = formatBytes({ bytes: this.maxSize });
  acceptedTypesString: string = '.csv';

  // Set accepted types string on init
  ngOnInit(): void {
    this.acceptedTypesString = this.acceptedTypes.join(', ');
  }

  // Handle file upload
  onFileUpload(event: Event): void {
    const target = event.target as HTMLInputElement;

    if (!target) {
      return this.alertService.showAlert('Error reading file.', 'information');
    }

    const file: File | undefined = target.files?.[0];

    // Check if a file was selected
    if (!file) {
      return this.alertService.showAlert('No file selected.', 'information');
    }

    // Check file type
    if (file.type !== 'text/csv') {
      return this.alertService.showAlert(
        'Invalid file type. Please select a CSV file.',
        'warning'
      );
    }

    // Check file size
    if (file.size >= MAX_FILE_SIZE) {
      return this.alertService.showAlert(
        `File size exceeds ${formatBytes({
          bytes: MAX_FILE_SIZE,
        })}. Please select a smaller file.`,
        'warning'
      );
    }

    // Making sure the file upload handler is provided
    if (!this.fileUploadHandler) {
      console.error('No file upload handler provided.');
      return;
    }

    // Call the file upload handler and clear the file input for next file
    this.fileUploadHandler(file);
    this.clearFileInput();
  }

  clearFileInput(): void {
    const input = document.getElementById('file-uploader') as HTMLInputElement;
    if (input) {
      input.value = '';
    }
  }

  // Drag and drop events
  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }

  onDragEnter(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();

    // Highlight the drop area
    document.getElementById('dropzone')?.classList.add('drag-over');
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();

    // Remove highlight from the drop area
    document.getElementById('dropzone')?.classList.remove('drag-over');
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();

    // Remove highlight from the drop area
    document.getElementById('dropzone')?.classList.remove('drag-over');

    // Check if files were dropped
    if (event.dataTransfer && event.dataTransfer.files) {
      const file = event.dataTransfer.files[0];

      if (!file) {
        return this.alertService.showAlert('No file selected.', 'information');
      }

      if (file.type !== 'text/csv') {
        return this.alertService.showAlert(
          'Invalid file type. Please select a CSV file.',
          'warning'
        );
      }

      if (file.size >= MAX_FILE_SIZE) {
        return this.alertService.showAlert(
          `File size exceeds ${formatBytes({
            bytes: MAX_FILE_SIZE,
          })}. Please select a smaller file.`,
          'warning'
        );
      }

      this.fileUploadHandler(file);
    }
  }
}
