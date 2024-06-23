import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';

// Constants
import { MAX_FILE_SIZE } from '../../constants';
import { formatBytes } from '../../helpers';

@Component({
  selector: 'app-file-uploader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './file-uploader.component.html',
  styleUrl: './file-uploader.component.scss',
})
export class FileUploaderComponent {
  @Input() title: string = 'Upload a file';
  @Input() acceptedTypes: string[] = ['csv'];
  @Input() fileUploadHandler: (file: File) => void = () => {};

  maxSize: number = MAX_FILE_SIZE;
  maxSizeString: string = formatBytes({ bytes: this.maxSize });

  onFileUpload(event: Event): void {
    const target = event.target as HTMLInputElement;

    if (!target) {
      alert('Error reading file.');
      return;
    }

    const file: File | undefined = target.files?.[0];

    if (!file) {
      alert('No file selected.');
      return;
    }

    if (file.type !== 'text/csv') {
      alert('Invalid file type. Please select a CSV file.');
      return;
    }

    if (file.size >= MAX_FILE_SIZE) {
      alert('File size exceeds 2MB. Please select a smaller file.');
      return;
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
