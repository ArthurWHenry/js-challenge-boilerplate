import { CommonModule } from '@angular/common';
import { Component, Output } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// Helpers
import { isValidChecksum } from '../helpers';
import { Policy, ResponseId } from '../types';

const MAX_FILE_SIZE = 2097152; // 2MB

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  @Output() policies: { policyNumber: string; isValid: string }[] = [];
  @Output() title: string = 'kin-ocr';

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
        this.policies = contents
          .split(/[\r\n,]+/)
          .map((number: string): { policyNumber: string; isValid: string } => {
            const parsedNumber: number = parseInt(number);
            // We only want to check if it's a number. We don't want to show
            // this to the user because if we have a policy number that starts
            // with 0, it will be removed.
            if (isNaN(parsedNumber)) {
              throw new Error('Invalid number in file.');
            }
            const isValid: boolean = isValidChecksum(number);
            return {
              policyNumber: number,
              isValid: isValid ? 'valid' : 'error',
            };
          });
      } catch (error) {
        alert(error);
        return;
      }
    };

    reader.readAsText(file);
    return;
  }

  async submitPolicyNumbers(): Promise<any> {
    if (!this.policies.length) {
      window.alert('No policy numbers available.');
      return;
    }
    const response: ResponseId & Policy[] = await fetch(
      'https://jsonplaceholder.typicode.com/posts',
      {
        method: 'POST',
        body: JSON.stringify({
          policies: [...this.policies],
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }
    )
      .then((response: Response): Promise<ResponseId & Policy[]> => {
        if (!response.ok) {
          window.alert('Error sending data to server.');
          // throw new Error('Error sending data to server.');
        }
        return response.json();
      })
      .then(
        (response: ResponseId & Policy[]): ResponseId & Policy[] => response
      );

    window.alert('Data sent successfully. ID: ' + response.id);
    return response.id;
  }
}
