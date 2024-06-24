import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// API
import { postPolicyNumbers } from '../api/submit-policies';

// Components
import { AlertComponent } from './alert/alert.component';
import { ButtonComponent } from './button/button.component';
import { FileUploaderComponent } from './file-uploader/file-uploader.component';
import { PolicyTableComponent } from './policy-table/policy-table.component';

// Helpers
import { isValidChecksum } from '../helpers';

// Types
import { Policy, PostResponse } from '../types';

// Services
import { AlertService } from './alert/alert.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    AlertComponent,
    ButtonComponent,
    FileUploaderComponent,
    PolicyTableComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  // Inject the AlertService
  constructor(private alertService: AlertService) {}

  // Properties
  private _policies: Policy[] = [];
  submitButtonDisabled: boolean = true;
  title: string = 'kin-ocr';

  // Get the policies array
  get policies(): Policy[] {
    return this._policies;
  }

  // Set the policies array and update the submit button disabled property
  set policies(value: Policy[]) {
    this._policies = value;
    this.submitButtonDisabled = this._policies.length === 0;
  }

  // Clear the policies array
  clearPolicyNumbers: () => void = (): void => {
    this.policies = [];
    this.alertService.showAlert(
      'Data cleared. Please upload a new file.',
      'information'
    );
  };

  // Handle the file upload
  handleFileUpload: (file: File) => void = (file: File): void => {
    const reader = new FileReader();
    reader.onload = this.processFileContent;
    reader.readAsText(file);
  };

  // Process the file contents
  private processFileContent: (e: ProgressEvent<FileReader>) => void = (
    e: ProgressEvent<FileReader>
  ): void => {
    const contents = e.target?.result as string;
    try {
      const policies: Policy[] = this.parsePolicies(contents);
      this.policies = policies;
    } catch (error) {
      this.alertService.showAlert(
        'Invalid number exists in your file.',
        'warning'
      );
      return;
    }
    this.alertService.showAlert('File uploaded successfully.', 'success');
  };

  // Parse the policies from the file contents
  private parsePolicies(contents: string): Policy[] {
    return contents.split(/[\r\n,]+/).map((line: string): Policy => {
      const policyNumber: string = line.trim();
      if (!policyNumber || isNaN(Number(policyNumber))) {
        throw new Error('Invalid number in file.');
      }
      return {
        policyNumber,
        isValid: isValidChecksum(policyNumber) ? 'valid' : 'error',
      };
    });
  }

  // Submit the policy numbers
  submitPolicyNumbers: () => Promise<any> = async (): Promise<any> => {
    const response: PostResponse = await postPolicyNumbers({
      policies: this.policies,
    });

    if (response.status === 'error' || !response.responseId) {
      this.alertService.showAlert('Error submitting policy numbers.', 'error');
      return;
    }

    this.alertService.showAlert(
      `Policy numbers submitted successfully. (id: ${response.responseId})`,
      'success'
    );
  };
}
