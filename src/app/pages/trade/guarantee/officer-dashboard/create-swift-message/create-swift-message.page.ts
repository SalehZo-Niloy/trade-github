import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TradeLayoutComponent } from '../../../../../styles/layout/trade-layout.component';
import { UiInputComponent } from '../../../../../components/ui/ui-input.component';

@Component({
  selector: 'app-create-swift-message-page',
  standalone: true,
  imports: [CommonModule, TradeLayoutComponent, UiInputComponent],
  templateUrl: './create-swift-message.page.html'
})
export class CreateSwiftMessagePageComponent {
  reviewDecision: 'proceed' | 'send-back' = 'proceed';

  constructor(private router: Router) {}

  goBackToReview(): void {
    this.router.navigate(['/trade', 'guarantee-application-review']);
  }

  submitAndEscalate(): void {
    this.router.navigate(['/trade', 'guarantee-officer-dashboard']);
  }
}
