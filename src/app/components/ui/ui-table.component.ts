import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { tradeTheme } from '../../styles/theme';

@Component({
  selector: 'app-ui-table',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="overflow-x-auto">
      <div
        class="inline-block min-w-full align-middle"
      >
        <div
          class="overflow-hidden rounded-xl border"
          [ngClass]="[theme.border.default, theme.surface.card]"
        >
          <table class="min-w-full divide-y divide-slate-200 text-sm">
            <ng-content></ng-content>
          </table>
        </div>
      </div>
    </div>
  `
})
export class UiTableComponent {
  theme = tradeTheme;
}
