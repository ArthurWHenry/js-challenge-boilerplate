import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @Input() disabled: boolean = false;
  @Input() onClick: () => void = () => {};
  @Input() text: string = 'Submit';
  @Input() variant: 'primary' | 'secondary' = 'primary';
  classes: string = `${this.variant}-button`;

  ngOnInit(): void {
    // Update the classes property when the variant changes
    this.classes = `${this.variant}-button`;
  }
}
