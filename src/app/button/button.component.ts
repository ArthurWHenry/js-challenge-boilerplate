import { Component, Input } from '@angular/core';

// Types
import type { ButtonVariant } from '../../types';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  // Properties
  @Input() disabled: boolean = false;
  @Input() onClick: () => void = (): void => {};
  @Input() text: string = 'Submit';
  @Input() variant: ButtonVariant = 'primary';
  classes: string = `button button__${this.variant}`;

  ngOnInit(): void {
    // Update the classes property when the variant changes
    this.classes = `button button__${this.variant}`;
  }
}
