import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TradeLayoutComponent } from '../../../../../styles/layout/trade-layout.component';

@Component({
  selector: 'app-guarantee-amendment-review-page',
  standalone: true,
  imports: [CommonModule, TradeLayoutComponent],
  templateUrl: './guarantee-amendment-review.page.html'
})
export class GuaranteeAmendmentReviewPageComponent {
  constructor(private router: Router) {}

  goBackToDashboard(): void {
    this.router.navigate(['/trade', 'guarantee-officer-dashboard']);
  }

  goToSwiftAmendment(): void {
    this.router.navigate(['/trade', 'guarantee-amendment-processing', 'create-swift']);
  }
}

