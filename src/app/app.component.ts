import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

const MAX_FILE_SIZE = 2097152; // 2MB

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  policyNumbers: number[] = [];
  title: string = 'kin-ocr';

  onFileSelected(event: Event): void {
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

    // If file is of 2MB or more, alert the user and return.
    if (file.size >= MAX_FILE_SIZE) {
      alert('File size exceeds 2MB. Please select a smaller file.');
      return;
    }

    const reader = new FileReader();

    reader.onload = (e: ProgressEvent<FileReader>): void => {
      const contents = e.target?.result as string;

      // Split the contents of the file by new line or comma and cast to number.
      try {
        this.policyNumbers = contents
          .split(/[\r\n,]+/)
          .map((number: string): number => {
            const parsedNumber: number = parseInt(number);
            if (isNaN(parsedNumber)) {
              throw new Error('Invalid number in file.');
            }
            return parsedNumber;
          });
      } catch (error) {
        alert(error);
        return;
      }
    };

    reader.readAsText(file);
    return;
  }
}
