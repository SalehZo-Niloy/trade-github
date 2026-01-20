import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TradeLayoutComponent } from '../../../../../styles/layout/trade-layout.component';

@Component({
  selector: 'app-guarantee-amendment-final-review-page',
  standalone: true,
  imports: [CommonModule, TradeLayoutComponent],
  templateUrl: './guarantee-amendment-final-review.page.html'
})
export class GuaranteeAmendmentFinalReviewPageComponent {
  constructor(private router: Router) {}

  goBackToDashboard(): void {
    this.router.navigate(['/trade', 'guarantee-officer-dashboard']);
  }
}

