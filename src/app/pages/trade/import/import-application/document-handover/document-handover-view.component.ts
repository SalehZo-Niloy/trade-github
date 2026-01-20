import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UiButtonComponent } from '../../../../../components/ui/ui-button.component';
import { TradeLayoutComponent } from '../../../../../styles/layout/trade-layout.component';

interface SummaryItem {
  label: string;
  value: string;
}

interface DocumentRow {
  type: string;
  fileName: string;
  uploadedBy: string;
  uploadDate: string;
}

interface ComparisonRow {
  parameter: string;
  requestValue: string;
  documentValue: string;
  matches: boolean;
}

interface ChecklistItem {
  label: string;
  checked: boolean;
}

interface EligibilityItem {
  label: string;
  status: string;
  statusClass: string;
}

@Component({
  selector: 'app-document-handover-view',
  standalone: true,
  imports: [CommonModule, FormsModule, TradeLayoutComponent, UiButtonComponent],
  templateUrl: './document-handover-view.component.html',
})
export class DocumentHandoverViewComponent {
  header = {
    title: 'Import LC - Document Review & Handover',
    reference: 'IMPTLC/2024/001234',
    lcType: 'Sight',
    status: 'Validated by RO / Pending Trade Review'
  };

  summary: SummaryItem[] = [
    { label: 'Invoice Amount', value: 'USD 850,000.00' },
    { label: 'Beneficiary', value: 'Shanghai Industrial Exports Co. Ltd., China' },
    { label: 'Incoterms', value: 'CIF Mumbai Port' },
    { label: 'Shipment Period', value: '15-Jan-2024 to 30-Jan-2024' },
    { label: 'Port of Loading', value: 'Shanghai Port' },
    { label: 'Port of Discharge', value: 'Mumbai Port' }
  ];

  documents: DocumentRow[] = [
    {
      type: 'Proforma Invoice',
      fileName: 'PI_ABC_001234.pdf',
      uploadedBy: 'Customer Portal',
      uploadDate: '12-Jan-2024'
    },
    {
      type: 'Commercial Invoice',
      fileName: 'CI_ABC_001234.pdf',
      uploadedBy: 'Customer Portal',
      uploadDate: '12-Jan-2024'
    },
    {
      type: 'Packing List',
      fileName: 'PL_ABC_001234.pdf',
      uploadedBy: 'Customer Portal',
      uploadDate: '12-Jan-2024'
    },
    {
      type: 'Certificate of Origin',
      fileName: 'CO_ABC_001234.pdf',
      uploadedBy: 'Customer Portal',
      uploadDate: '12-Jan-2024'
    },
    {
      type: 'Insurance',
      fileName: 'INS_ABC_001234.pdf',
      uploadedBy: 'Customer Portal',
      uploadDate: '12-Jan-2024'
    }
  ];

  comparison: ComparisonRow[] = [
    {
      parameter: 'Invoice Amount',
      requestValue: 'USD 850,000.00',
      documentValue: 'USD 850,000.00',
      matches: true
    },
    {
      parameter: 'Beneficiary Name',
      requestValue: 'Shanghai Industrial Exports Co. Ltd.',
      documentValue: 'Shanghai Industrial Exports Co. Ltd.',
      matches: true
    },
    {
      parameter: 'Goods Description',
      requestValue: 'Industrial Machinery Parts',
      documentValue: 'Industrial Machinery Parts',
      matches: true
    },
    {
      parameter: 'Shipment Period',
      requestValue: '15-Jan-2024 to 30-Jan-2024',
      documentValue: 'Within Period',
      matches: true
    }
  ];

  checklist: ChecklistItem[] = [
    { label: 'Proforma invoice present and readable', checked: true },
    { label: 'Beneficiary details match LC request', checked: true },
    { label: 'Goods description consistent', checked: true },
    { label: 'Amount and currency consistent', checked: true },
    { label: 'No material discrepancies found', checked: false }
  ];

  discrepancy = {
    description: '',
    missingItems: ''
  };

  remarks = {
    tradeRemarks: ''
  };

  routingDecision = 'forward';

  sanctionOverview = {
    totalLimit: 'USD 5,000,000',
    utilizedLimit: 'USD 3,900,000',
    availableLimit: 'USD 1,100,000',
    utilizationPercent: 78,
    status: 'Sufficient'
  };

  exposure = {
    proposedAmount: 'USD 850,000',
    availableAfter: 'USD 250,000',
    withinLimit: true
  };

  eligibility: EligibilityItem[] = [
    { label: 'Import LC', status: 'Allowed', statusClass: 'bg-emerald-100 text-emerald-700' },
    { label: 'PAD', status: 'Allowed', statusClass: 'bg-emerald-100 text-emerald-700' }
  ];

  alertMessage = 'Available limit is nearing threshold. Please review carefully.';
}
