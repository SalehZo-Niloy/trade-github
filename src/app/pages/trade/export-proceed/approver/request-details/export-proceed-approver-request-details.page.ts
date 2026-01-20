import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { TradeLayoutComponent } from '../../../../../styles/layout/trade-layout.component';

@Component({
  selector: 'app-export-proceed-approver-request-details',
  standalone: true,
  imports: [CommonModule, RouterLink, TradeLayoutComponent],
  templateUrl: './export-proceed-approver-request-details.page.html'
})
export class ExportProceedApproverRequestDetailsPageComponent implements OnInit {
  id: string = '';
  
  proceedDetails = {
    id: 'PR-2026-232914',
    status: 'Pending Approval',
    customer: 'New Customer Ltd',
    cif: 'CIF-9999',
    accountNo: '123-456-789',
    billNo: 'BC-25-22',
    lcNo: 'LC-25-7',
    swiftRef: 'SW-62174',
    valueDate: '19 Jan 2026',
    currency: 'USD',
    amount: 3390.00
  };

  distributionSummary = {
    creditToCustomer: 0.00,
    loanAdjustment: 0.00,
    investmentAdjustment: 0.00,
    totalCharges: 143.00
  };

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    if (this.id) {
       this.proceedDetails.id = this.id;
    }
  }

  approve() {
    console.log('Approved');
    this.proceedDetails.status = 'Realized';
    this.router.navigate(['/trade/export-proceed/approver/dashboard']);
  }

  reject() {
    console.log('Rejected');
    this.proceedDetails.status = 'Discrepancy Raised'; // Or some other status
    this.router.navigate(['/trade/export-proceed/approver/dashboard']);
  }
}
