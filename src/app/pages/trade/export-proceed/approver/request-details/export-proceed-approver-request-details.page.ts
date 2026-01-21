import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { TradeLayoutComponent } from '../../../../../styles/layout/trade-layout.component';
import Swal from 'sweetalert2';

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
    Swal.fire({
      title: 'Approve Proceed?',
      text: "Are you sure you want to approve this proceed?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#2563eb',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Approve'
    }).then((result) => {
      if (result.isConfirmed) {
        console.log('Approved');
        this.proceedDetails.status = 'Realized';
        Swal.fire({
          title: 'Approved!',
          text: 'The proceed has been approved.',
          icon: 'success',
          confirmButtonColor: '#2563eb'
        }).then(() => {
          this.router.navigate(['/trade/export-proceed/approver/dashboard']);
        });
      }
    });
  }

  reject() {
    Swal.fire({
      title: 'Reject Proceed?',
      text: "Are you sure you want to reject this proceed?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, Reject'
    }).then((result) => {
      if (result.isConfirmed) {
        console.log('Rejected');
        this.proceedDetails.status = 'Discrepancy Raised';
        Swal.fire({
          title: 'Rejected!',
          text: 'The proceed has been rejected.',
          icon: 'error',
          confirmButtonColor: '#2563eb'
        }).then(() => {
          this.router.navigate(['/trade/export-proceed/approver/dashboard']);
        });
      }
    });
  }
}
