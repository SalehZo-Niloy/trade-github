import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TradeLayoutComponent } from '../../../../../styles/layout/trade-layout.component';
import { UiInputComponent } from '../../../../../components/ui/ui-input.component';
import { UiTableComponent } from '../../../../../components/ui/ui-table.component';

interface ExistingGuaranteeRow {
  reference: string;
  type: string;
  amount: string;
  expiry: string;
  status: string;
}

interface UploadedDocumentRow {
  name: string;
  fileName: string;
  size: string;
  uploadedAt: string;
  status: string;
}

@Component({
  selector: 'app-guarantee-application-review-page',
  standalone: true,
  imports: [CommonModule, TradeLayoutComponent, UiInputComponent, UiTableComponent],
  templateUrl: './guarantee-application-review.page.html'
})
export class GuaranteeApplicationReviewPageComponent {
  existingGuarantees: ExistingGuaranteeRow[] = [
    {
      reference: 'GTR-2023-006578',
      type: 'Advance Payment',
      amount: 'AED 300,000',
      expiry: 'Jun 30, 2024',
      status: 'Active'
    },
    {
      reference: 'GTR-2023-004321',
      type: 'Bid Bond',
      amount: 'AED 150,000',
      expiry: 'Mar 15, 2024',
      status: 'Active'
    }
  ];

  uploadedDocuments: UploadedDocumentRow[] = [
    {
      name: 'Contract/Tender Document',
      fileName: 'construction_contract_2024.pdf',
      size: '2.3 MB',
      uploadedAt: 'Jan 11, 09:10',
      status: 'Uploaded'
    },
    {
      name: 'Board Resolution/Authorization',
      fileName: 'board_resolution_2024.pdf',
      size: '1.1 MB',
      uploadedAt: 'Jan 11, 09:12',
      status: 'Uploaded'
    },
    {
      name: 'Draft Guarantee Text',
      fileName: 'guarantee_text_draft.pdf',
      size: '0.8 MB',
      uploadedAt: 'Jan 11, 09:14',
      status: 'Uploaded'
    }
  ];

  checklist = [
    'All mandatory fields provided',
    'Required documents uploaded',
    'Amount within approved limit',
    'Margin & pricing acceptable',
    'Beneficiary & country risk acceptable',
    'Guarantee text compliant'
  ];

  deficiencyReasons = [
    'Missing mandatory fields',
    'Invalid values',
    'Missing/incorrect documents',
    'Non-compliant guarantee text'
  ];

  swiftRequirement: 'not-required' | 'required' = 'required';
  finalDecision: 'send-back' | 'escalate' = 'escalate';

  constructor(private router: Router) {}

  goBackToDashboard(): void {
    this.router.navigate(['/trade', 'guarantee-officer-dashboard']);
  }

  createSwiftMessage(): void {
    this.router.navigate(['/trade', 'create-swift-message']);
  }
}
