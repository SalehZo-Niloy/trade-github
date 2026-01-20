import { Component, OnInit } from '@angular/core';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { TradeRequestService, TradeRequest } from '../../../../../services/trade-request.service';
import { FormsModule } from '@angular/forms';
import { TradeLayoutComponent } from '../../../../../styles/layout/trade-layout.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-to-request-details',
  standalone: true,
  imports: [CommonModule, FormsModule, TradeLayoutComponent, NgIf, NgFor],
  templateUrl: './to-request-details.page.html',
  styleUrls: ['./to-request-details.page.scss']
})
export class TradeOfficerRequestDetailsPageComponent implements OnInit {
  request: TradeRequest | undefined;
  
  showChargesModal = false;
  chargeForm = {
    adviceCharge: 0,
    swiftCharge: 0,
    vatPercent: 5
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tradeRequestService: TradeRequestService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.request = this.tradeRequestService.getRequestById(id);
        if (this.request?.charges?.length) {
          this.populateFormFromCharges();
        }
      }
    });
  }

  populateFormFromCharges() {
    if (!this.request?.charges) return;
    
    const advice = this.request.charges.find(c => c.description === 'Advice Charge');
    const swift = this.request.charges.find(c => c.description === 'SWIFT Charge');
    // Try to extract VAT percent from description like "VAT (5%)"
    const vat = this.request.charges.find(c => c.description.startsWith('VAT'));
    
    if (advice) this.chargeForm.adviceCharge = advice.amount;
    if (swift) this.chargeForm.swiftCharge = swift.amount;
    
    if (vat) {
      const match = vat.description.match(/(\d+)%/);
      if (match) {
        this.chargeForm.vatPercent = parseInt(match[1], 10);
      }
    }
  }

  openChargesModal() {
    this.showChargesModal = true;
  }

  closeChargesModal() {
    this.showChargesModal = false;
  }

  saveCharges() {
    if (!this.request) return;

    const currency = this.request.exportLC.currency || 'USD';
    const vatAmount = (this.chargeForm.adviceCharge * this.chargeForm.vatPercent) / 100;

    const charges = [
      {
        amount: this.chargeForm.adviceCharge,
        currency: currency,
        description: 'Advice Charge',
        status: 'PENDING' as const
      },
      {
        amount: this.chargeForm.swiftCharge,
        currency: currency,
        description: 'SWIFT Charge',
        status: 'PENDING' as const
      },
      {
        amount: vatAmount,
        currency: currency,
        description: `VAT (${this.chargeForm.vatPercent}%)`,
        status: 'PENDING' as const
      }
    ];

    this.tradeRequestService.updateRequestCharges(this.request.id, charges);
    this.request = this.tradeRequestService.getRequestById(this.request.id); // Refresh local state
    this.closeChargesModal();
  }

  getTotalCharges(): number {
    if (!this.request?.charges) return 0;
    return this.request.charges.reduce((sum, c) => sum + c.amount, 0);
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'TO_TRADE_OFFICER': return 'status-purple';
      case 'PENDING_APPROVAL': return 'status-orange';
      case 'APPROVED': return 'status-green';
      case 'DC_ADVICE_ISSUED': return 'status-teal';
      default: return 'status-gray';
    }
  }

  getStatusLabel(status: string): string {
    return status?.replace(/_/g, ' ');
  }

  submitForApproval() {
    if (!this.request) return;

    Swal.fire({
      title: 'Submit for Approval?',
      text: "This will send the request to the approver.",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#7b1fa2', // Purple
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, submit it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.tradeRequestService.updateRequestStatus(
          this.request!.id, 
          'PENDING_APPROVAL', 
          'TO', 
          'Submitted for approval.'
        );
        
        Swal.fire({
          title: 'Submitted Successfully!',
          text: 'Request has been sent for approval.',
          icon: 'success',
          confirmButtonColor: '#7b1fa2'
        }).then(() => {
          this.router.navigate(['/trade/dc-advising/to/dashboard']);
        });
      }
    });
  }

  returnToCustomer() {
    if (!this.request) return;

    Swal.fire({
      title: 'Return to Customer?',
      text: "Please provide a reason for returning:",
      input: 'text',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Return Request',
      inputValidator: (value) => {
        if (!value) {
          return 'You need to write a reason!'
        }
        return null;
      }
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        this.tradeRequestService.updateRequestStatus(
          this.request!.id, 
          'RETURNED', 
          'TO', 
          `Returned to customer: ${result.value}`
        );
        
        Swal.fire({
          title: 'Returned Successfully!',
          text: 'Request has been returned to customer.',
          icon: 'success',
          confirmButtonColor: '#7b1fa2'
        }).then(() => {
          this.router.navigate(['/trade/dc-advising/to/dashboard']);
        });
      }
    });
  }
}
