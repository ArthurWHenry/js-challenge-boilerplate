import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

// Services
import { AlertService } from './alert.service';

// Types
import type { Alert, AlertVariant } from '../../types';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss',
})
export class AlertComponent {
  // Properties
  private _variant: AlertVariant = 'information';
  get variant(): AlertVariant {
    return this._variant;
  }
  @Input()
  set variant(value: AlertVariant) {
    this._variant = value;
    this.updateClasses();
  }
  classes: string = `alert alert__${this.variant}`;
  isVisible: boolean = false;
  message: string = '';
  timeout: any;
  title: string =
    this.variant.charAt(0).toUpperCase() + this.variant.slice(1) + ' Alert';

  // Inject the AlertService
  constructor(private alertService: AlertService) {}

  // Initialize the component
  ngOnInit(): void {
    this.alertService.getAlert().subscribe((alert: Alert): void => {
      this.message = alert.message;
      this.variant = alert.variant;
      this.classes = `alert alert__${this.variant}`;
      this.title =
        alert.variant.charAt(0).toUpperCase() +
        alert.variant.slice(1) +
        ' Alert';
      this.show(alert.timeout);
    });
  }

  // Show the alert for a specified amount of time
  show(timeout: number): void {
    this.isVisible = true;
    clearTimeout(this.timeout);
    this.timeout = setTimeout((): void => {
      this.isVisible = false;
    }, timeout);
  }

  // Close the alert clear alert information
  close(): void {
    clearTimeout(this.timeout);
    this.isVisible = false;
    this.message = '';
    this.title = '';
  }

  // Update the classes based on the variant
  private updateClasses(): void {
    this.classes = `alert alert__${this.variant}`;
    this.title =
      this.variant.charAt(0).toUpperCase() + this.variant.slice(1) + ' Alert';
  }
}
