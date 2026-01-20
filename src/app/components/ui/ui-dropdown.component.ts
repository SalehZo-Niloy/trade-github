import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { tradeTheme } from '../../styles/theme';

interface UiDropdownOption {
  label: string;
  value: string;
}

@Component({
  selector: 'app-ui-dropdown',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-1.5">
      <label class="text-xs font-medium text-slate-700">
        {{ label }}
        <span *ngIf="required" class="text-red-500">*</span>
      </label>
      <div class="relative">
        <button
          type="button"
          class="flex w-full items-center justify-between rounded-md border px-3 py-2 text-sm text-slate-700"
          [ngClass]="[theme.border.strong, theme.surface.card]"
          (click)="toggleOpen()"
        >
          <span>
            {{
              selectedLabel ||
              placeholder ||
              'Select'
            }}
          </span>
          <span>▾</span>
        </button>
        <div
          *ngIf="open"
          class="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md border py-1 text-sm shadow-lg"
          [ngClass]="[theme.border.default, theme.surface.card]"
        >
          <button
            type="button"
            class="flex w-full items-center justify-between px-3 py-1.5 text-left text-slate-700 hover:bg-slate-50"
            *ngFor="let option of options"
            (click)="select(option)"
          >
            <span>{{ option.label }}</span>
            <span *ngIf="option.value === value" class="text-xs text-blue-600">●</span>
          </button>
        </div>
      </div>
    </div>
  `
})
export class UiDropdownComponent {
  @Input() label = '';
  @Input() placeholder = '';
  @Input() required = false;
  @Input() options: UiDropdownOption[] = [];

  @Input() value = '';
  @Output() valueChange = new EventEmitter<string>();

  open = false;

  theme = tradeTheme;

  get selectedLabel(): string {
    const match = this.options.find((o) => o.value === this.value);
    return match ? match.label : '';
  }

  toggleOpen(): void {
    this.open = !this.open;
  }

  select(option: UiDropdownOption): void {
    this.value = option.value;
    this.valueChange.emit(this.value);
    this.open = false;
  }
}
