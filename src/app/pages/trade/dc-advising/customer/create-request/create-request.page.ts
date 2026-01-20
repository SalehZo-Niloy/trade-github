import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TradeLayoutComponent } from '../../../../../styles/layout/trade-layout.component';
import { UiInputComponent } from '../../../../../components/ui/ui-input.component';
import { TradeRequestService } from '../../../../../services/trade-request.service';

@Component({
  selector: 'app-create-request',
  standalone: true,
  imports: [CommonModule, TradeLayoutComponent, UiInputComponent, FormsModule],
  templateUrl: './create-request.page.html',
})
export class CreateRequestPageComponent {
  step = 1;
  steps = ['Applicant', 'Export LC', 'DC Advice', 'Documents', 'Review'];
  
  lcTypes = ['Irrevocable', 'Revocable', 'Confirmed', 'Unconfirmed'];
  currencies = ['USD', 'EUR', 'GBP', 'JPY', 'CNY'];

  data = {
    applicant: { name: 'My Company Ltd', cif: 'CIF12345', account: 'ACC123456', email: 'me@company.com' },
    exportLC: { 
      lcNo: '', 
      lcType: '',
      amount: '', 
      currency: '', 
      exchangeRate: '',
      amountLcy: '',
      expiryDate: '',
      issueDate: '',
      issuingBank: '',
      beneficiaryName: ''
    },
    dcAdvice: { dcNumber: 'Will be generated', shipmentDate: '', expiryDate: '' },
    documents: [] as any[]
  };

  constructor(
    private router: Router,
    private tradeService: TradeRequestService
  ) {}

  nextStep() {
    if (this.step < 5) {
      this.step++;
    }
  }

  prevStep() {
    if (this.step > 1) {
      this.step--;
    }
  }

  submit() {
    // Submit logic here
    console.log('Submitting request:', this.data);
    this.tradeService.addRequest(this.data);
    this.router.navigate(['/trade/dc-advising/customer/dashboard']);
  }
  
  handleDocumentUpload(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.data.documents.push({ name: file.name, size: file.size });
      console.log('Document uploaded:', file.name);
    }
  }

  handleSwiftPdfUpload(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      console.log('File uploaded:', file.name);
      
      // Simulate auto-fill logic
      setTimeout(() => {
        this.data.exportLC = {
          ...this.data.exportLC,
          lcNo: 'LC-AUTO-' + Math.floor(Math.random() * 10000),
          lcType: 'Irrevocable',
          amount: '50000',
          currency: 'USD',
          exchangeRate: '1.0',
          amountLcy: '50000',
          issueDate: new Date().toISOString().split('T')[0],
          issuingBank: 'Bank of America',
          beneficiaryName: this.data.applicant.name
        };
        // Trigger change detection if needed, but Angular should handle it
      }, 500);
    }
  }
}
