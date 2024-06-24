import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

// Types
import type { Policy } from '../../types';

@Component({
  selector: 'app-policy-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './policy-table.component.html',
  styleUrl: './policy-table.component.scss',
})
export class PolicyTableComponent {
  // Properties
  @Input() tableData: Policy[] = [];
  columns: string[] = ['', 'Policy #', 'Result'];
}
