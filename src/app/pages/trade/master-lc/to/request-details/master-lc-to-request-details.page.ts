import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TradeLayoutComponent } from '../../../../../styles/layout/trade-layout.component';
import { MasterLCService, MasterLCRequest } from '../../../../../services/master-lc.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-master-lc-to-request-details',
  standalone: true,
  imports: [CommonModule, TradeLayoutComponent, FormsModule],
  templateUrl: './master-lc-to-request-details.page.html'
})
export class MasterLCToRequestDetailsPageComponent implements OnInit {
  request: MasterLCRequest | undefined;
  isLoading = true;
  remarks: string = '';

  // Financials
  limitApproved = 1000000.00;
  limitUtilized = 450000.00;
  limitAvailable = 550000.00;
  
  marginPercent: number = 10;
  marginAmount: number = 0;
  commissionPercent: number = 0.25;
  totalCharges: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private masterLCService: MasterLCService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.loadRequest(id);
      }
    });
  }

  loadRequest(id: string) {
    this.request = this.masterLCService.getRequestById(id);
    this.isLoading = false;
    
    if (this.request) {
      // Initialize financials from request if they exist, otherwise use defaults
      if (this.request.marginPercent !== undefined) this.marginPercent = this.request.marginPercent;
      if (this.request.commissionPercent !== undefined) this.commissionPercent = this.request.commissionPercent;
      
      // Mock Limit Logic (randomize slightly for demo if new)
      if (this.request.limitApproved) {
         this.limitApproved = this.request.limitApproved;
         this.limitUtilized = this.request.limitUtilized || 0;
         this.limitAvailable = this.request.limitAvailable || 0;
      } else {
         // First time viewing, set defaults/mock
         this.limitApproved = 1000000.00;
         this.limitUtilized = 450000.00;
         this.limitAvailable = this.limitApproved - this.limitUtilized;
      }

      this.calculateFinancials();
    }
  }

  calculateFinancials() {
    if (!this.request) return;

    const amount = this.request.requestedAmount || 0;
    
    // Margin Amount
    this.marginAmount = amount * (this.marginPercent / 100);

    // Total Charges (Est) = Commission
    this.totalCharges = amount * (this.commissionPercent / 100);
  }

  approve() {
    if (this.request) {
      // 1. Save Financials
      const updatedReq = { ...this.request };
      updatedReq.limitApproved = this.limitApproved;
      updatedReq.limitUtilized = this.limitUtilized;
      updatedReq.limitAvailable = this.limitAvailable;
      updatedReq.marginPercent = this.marginPercent;
      updatedReq.marginAmount = this.marginAmount;
      updatedReq.commissionPercent = this.commissionPercent;
      updatedReq.totalCharges = this.totalCharges;
      
      this.masterLCService.updateRequest(updatedReq);

      // 2. Move to Manager
      this.masterLCService.updateStatus(
        this.request.id, 
        'Pending Manager Approval', 
        'Trade Officer', 
        this.remarks || 'Verified and forwarded to Manager'
      );
      this.router.navigate(['/trade/master-lc/to/dashboard']);
    }
  }

  reject() {
    if (this.request) {
      this.masterLCService.updateStatus(
        this.request.id, 
        'Rejected', 
        'Trade Officer', 
        this.remarks || 'Rejected by Trade Officer'
      );
      this.router.navigate(['/trade/master-lc/to/dashboard']);
    }
  }

  returnToCustomer() {
      if (this.request) {
        this.masterLCService.updateStatus(
            this.request.id,
            'Returned',
            'Trade Officer',
            this.remarks || 'Returned for correction'
        );
        this.router.navigate(['/trade/master-lc/to/dashboard']);
      }
  }
}
