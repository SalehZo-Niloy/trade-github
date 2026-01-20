import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TradeLayoutComponent } from '../../../../../styles/layout/trade-layout.component';
import { ExportBillService, ExportBill } from '../../../../../services/export-bill.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-export-bill',
  standalone: true,
  imports: [CommonModule, TradeLayoutComponent, FormsModule],
  templateUrl: './create-export-bill.page.html',
})
export class CreateExportBillPageComponent {
  currentStep = 1;

  // Form Data
  formData = {
    // Step 1
    applicantName: 'Alpha Exports Ltd',
    lcNumber: '',
    issuingBank: '',
    lcIssueDate: '',

    // Step 2
    buyerName: '',
    country: '',
    billAmount: null,
    currency: 'USD',
    collectionType: '',
    tenor: 0,

    // Step 3 (Documents)
    documents: [] as any[]
  };

  currencies = ['USD', 'EUR', 'GBP', 'JPY', 'CNY'];
  collectionTypes = ['D/P', 'D/A', 'Clean Collection'];

  constructor(
    private router: Router,
    private billService: ExportBillService
  ) {}

  nextStep() {
    if (this.currentStep < 4) {
      this.currentStep++;
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  submit() {
    // Logic to save the bill
    const billData: Partial<ExportBill> = {
      applicantName: this.formData.applicantName,
      lcNumber: this.formData.lcNumber,
      issuingBank: this.formData.issuingBank,
      lcIssueDate: this.formData.lcIssueDate,
      buyerName: this.formData.buyerName,
      country: this.formData.country,
      amount: this.formData.billAmount || 0,
      currency: this.formData.currency,
      collectionType: this.formData.collectionType,
      tenor: this.formData.tenor,
      documents: this.formData.documents
    };

    this.billService.addBill(billData);

    Swal.fire({
      title: 'Submitted Successfully!',
      text: 'Your export bill collection has been submitted.',
      icon: 'success',
      confirmButtonColor: '#0d9488'
    }).then(() => {
      this.router.navigate(['/trade/export-bill/customer/dashboard']);
    });
  }
}
