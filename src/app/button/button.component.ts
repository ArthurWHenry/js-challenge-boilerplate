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
  private _variant: ButtonVariant = 'primary';
  get variant(): ButtonVariant {
    return this._variant;
  }
  @Input()
  set variant(value: ButtonVariant) {
    this._variant = value;
    this.classes = `button button__${this.variant}`;
  }
  classes: string = `button button__${this.variant}`;

  ngOnInit(): void {
    // Update the classes property when the variant changes
    this.classes = `button button__${this.variant}`;
  }
}
