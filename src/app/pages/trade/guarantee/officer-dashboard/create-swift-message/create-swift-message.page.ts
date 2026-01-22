import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TradeLayoutComponent } from '../../../../../styles/layout/trade-layout.component';
import { UiInputComponent } from '../../../../../components/ui/ui-input.component';
import Swal from 'sweetalert2';

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
    Swal.fire({
      title: 'Submit SWIFT and escalate?',
      text: 'This will submit the MT76x message and escalate the case to checker.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#059669',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, submit'
    }).then(result => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Submitted',
          text: 'SWIFT message has been marked as submitted and escalated to checker.',
          icon: 'success',
          timer: 1800,
          showConfirmButton: false
        }).then(() => {
          this.router.navigate(['/trade', 'guarantee-officer-dashboard']);
        });
      }
    });
  }
}
