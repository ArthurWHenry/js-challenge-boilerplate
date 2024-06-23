import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// Components
import { ButtonComponent } from './button/button.component';
import { FileUploaderComponent } from './file-uploader/file-uploader.component';
import { PolicyTableComponent } from './policy-table/policy-table.component';

// Helpers
import { isValidChecksum } from '../helpers';

// Types
import { Policy, PostResponse } from '../types';
import { postPolicyNumbers } from '../api/submit-policies';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    ButtonComponent,
    FileUploaderComponent,
    PolicyTableComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  columns: string[] = ['', 'Policy #', 'Result'];
  private _policies: Policy[] = [];
  title: string = 'kin-ocr';
  submitButtonDisabled: boolean = true;

  get policies(): Policy[] {
    return this._policies;
  }

  set policies(value: Policy[]) {
    this._policies = value;
    // Update submitButtonDisabled based on the new policies array
    this.submitButtonDisabled = this._policies.length === 0;
  }

  // Clear the policies array
  clearPolicyNumbers: () => void = (): void => {
    this.policies = [];
  };

  // Handle the file upload
  handleFileUpload: (file: File) => void = (file: File): void => {
    const reader = new FileReader();

    reader.onload = (e: ProgressEvent<FileReader>): void => {
      const contents = e.target?.result as string;

      // Split the contents of the file by new line or comma and cast to number.
      try {
        const parsedNumbers: Policy[] = contents
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
        this.policies = [...parsedNumbers];
      } catch (error) {
        alert(error);
      }
    };

    reader.onerror = (error: ProgressEvent<FileReader>): void => {
      alert('Error reading file.');
    };

    reader.readAsText(file);
  };

  submitPolicyNumbers: () => Promise<any> = async (): Promise<any> => {
    const response: PostResponse = await postPolicyNumbers({
      policies: this.policies,
    });

    if (response.status === 'error' || !response.responseId) {
      alert('Error submitting policy numbers.');
      return;
    }

    alert(`Policy numbers submitted successfully. ${response.responseId}`);
    return;
  };
}
