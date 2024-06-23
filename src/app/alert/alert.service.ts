import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

// Constants
import { DEFAULT_ALERT_TIMEOUT } from '../../constants';

// Types
import type { Alert, AlertVariant } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private alertSubject: Subject<Alert> = new Subject<Alert>();

  // Get the alert message
  getAlert(): Observable<Alert> {
    return this.alertSubject.asObservable();
  }

  // Show an alert message
  showAlert(
    message: string,
    variant: AlertVariant = 'information',
    timeout: number = DEFAULT_ALERT_TIMEOUT
  ): void {
    this.alertSubject.next({ message, variant, timeout });
  }
}
