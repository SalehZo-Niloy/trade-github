import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TradeLayoutComponent } from '../../../../../styles/layout/trade-layout.component';
import { UiInputComponent } from '../../../../../components/ui/ui-input.component';
import { tradeTheme } from '../../../../../styles/theme';

interface ChecklistItem {
  label: string;
}

interface SwiftValidationItem {
  label: string;
}

@Component({
  selector: 'app-guarantee-checker-application-review-page',
  standalone: true,
  imports: [CommonModule, TradeLayoutComponent, UiInputComponent],
  templateUrl: './application-review.page.html'
})
export class GuaranteeCheckerApplicationReviewPageComponent {
  theme = tradeTheme;

  checklistItems: ChecklistItem[] = [
    { label: 'All mandatory fields provided' },
    { label: 'Required documents uploaded' },
    { label: 'Amount within approved limit' },
    { label: 'Margin & pricing acceptable' },
    { label: 'Beneficiary & country risk acceptable' },
    { label: 'Guarantee text compliant' }
  ];

  swiftValidationItems: SwiftValidationItem[] = [
    { label: 'All mandatory fields present' },
    { label: 'Amount & currency well defined' },
    { label: 'Beneficiary details verified' },
    { label: 'Governing rules aligned' },
    { label: 'Ready for transmission upon approval' }
  ];

  constructor(private router: Router) {}

  goBackToDashboard(): void {
    this.router.navigate(['/trade', 'guarantee-officer-checker-dashboard']);
  }

  submitDecision(): void {
    this.router.navigate(['/trade', 'guarantee-officer-checker-dashboard']);
  }
}
