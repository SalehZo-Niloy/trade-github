import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TradeLayoutComponent } from '../../../../../styles/layout/trade-layout.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-export-proceed-to-request-details',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, TradeLayoutComponent],
  templateUrl: './export-proceed-to-request-details.page.html'
})
export class ExportProceedToRequestDetailsPageComponent implements OnInit {
  id: string = '';
  step: number = 1;
  
  proceedDetails = {
    id: 'PR-2026-232914',
    status: 'Received',
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

  distributions: any[] = [
    { type: '', accountNo: '', amount: null }
  ];

  charges: any[] = [
    { name: '', amount: null }
  ];
  
  accountTypes = ['CASA', 'FC', 'Loan'];
  chargeTypes = ['Swift Charge', 'Commission Charge', 'Courier Charge', 'Handling Fee'];

  showDiscrepancyModal = false;
  discrepancyReason = '';

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    if (this.id) {
       this.proceedDetails.id = this.id;
    }
  }

  validateSwift() {
    this.step = 2;
    this.proceedDetails.status = 'Swift Validated';
  }

  addDistribution() {
    this.distributions.push({ type: '', accountNo: '', amount: null });
  }

  removeDistribution(index: number) {
    this.distributions.splice(index, 1);
  }

  get totalDistribution(): number {
    return this.distributions.reduce((sum, item) => sum + (item.amount || 0), 0);
  }

  addCharge() {
    this.charges.push({ name: '', amount: null });
  }

  removeCharge(index: number) {
    this.charges.splice(index, 1);
  }

  get totalCharges(): number {
    return this.charges.reduce((sum, item) => sum + (item.amount || 0), 0);
  }

  openDiscrepancyModal() {
    this.showDiscrepancyModal = true;
  }

  closeDiscrepancyModal() {
    this.showDiscrepancyModal = false;
  }

  submitDiscrepancy() {
    console.log('Discrepancy Raised:', this.discrepancyReason);
    this.proceedDetails.status = 'Discrepancy Raised';
    this.showDiscrepancyModal = false;
    this.router.navigate(['/trade/export-proceed/to/dashboard']);
  }

  submitForApproval() {
    Swal.fire({
      title: 'Submit for Approval?',
      text: "Are you sure you want to submit this proceed for approval?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#2563eb',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Submit'
    }).then((result) => {
      if (result.isConfirmed) {
        console.log('Submitted for Approval', {
          distributions: this.distributions,
          charges: this.charges
        });
        this.proceedDetails.status = 'Pending Approval';
        
        Swal.fire({
          title: 'Submitted!',
          text: 'The proceed has been submitted for approval.',
          icon: 'success',
          confirmButtonColor: '#2563eb'
        }).then(() => {
          this.router.navigate(['/trade/export-proceed/to/dashboard']);
        });
      }
    });
  }
}
