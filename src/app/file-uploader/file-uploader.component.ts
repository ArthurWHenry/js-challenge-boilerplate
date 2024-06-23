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
  constructor(private alertService: AlertService) {}

  @Input() acceptedTypes: string[] = ['.csv'];
  @Input() fileUploadHandler: (file: File) => void = () => {};
  @Input() title: string = 'Upload a file';
  maxSize: number = MAX_FILE_SIZE;
  maxSizeString: string = formatBytes({ bytes: this.maxSize });
  acceptedTypesString: string = '.csv';

  ngOnInit(): void {
    this.acceptedTypesString = this.acceptedTypes.join(', ');
  }

  onFileUpload(event: Event): void {
    const target = event.target as HTMLInputElement;

    if (!target) {
      return this.alertService.showAlert('Error reading file.', 'information');
    }

    const file: File | undefined = target.files?.[0];

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

    if (!this.fileUploadHandler) {
      console.error('No file upload handler provided.');
      return;
    }

    this.fileUploadHandler(file);
    this.clearFileInput();
  }

  clearFileInput(): void {
    const input = document.getElementById('file-uploader') as HTMLInputElement;
    if (input) {
      input.value = '';
    }
  }
}
