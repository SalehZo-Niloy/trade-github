import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TradeLayoutComponent } from '../../../../../styles/layout/trade-layout.component';
import { UiButtonComponent } from '../../../../../components/ui/ui-button.component';
import { ImportLcStateService } from '../../../../../services/import-lc-state.service';

@Component({
  selector: 'app-import-customer-view-page',
  standalone: true,
  imports: [CommonModule, TradeLayoutComponent, FormsModule, UiButtonComponent],
  templateUrl: './customer-view.page.html'
})
export class ImportCustomerViewPageComponent implements OnInit, OnDestroy {
  viewAs = 'Customer';
  referenceNumber = 'LC-2025-001'; // Mock reference
  requestDateTime = new Date().toLocaleString();
  submittedBy = '';
  currentStatus = 'Under Review';
  currentStatusDescription = 'Your application has been received and is currently being reviewed by our trade finance team.';

  workflow = [
    { label: 'Application Submitted', status: 'Completed' },
    { label: 'Bank Review', status: 'In Progress' },
    { label: 'Approval & Issuance', status: 'Pending' }
  ];

  summary = {
    typeOfLc: '',
    invoiceAmount: '',
    currency: '',
    beneficiaryName: '',
    beneficiaryCountry: '',
    incoterms: '',
    goodsDescription: '',
    expectedShipment: ''
  };

  uploadedReference = {
    fileName: 'No file uploaded',
    uploadedAt: '-'
  };

  acknowledgements = [
    'Application received successfully',
    'Initial validation passed',
    'Assigned to Trade Finance Officer'
  ];

  private subscription: Subscription = new Subscription();

  constructor(private importLcStateService: ImportLcStateService) {}

  ngOnInit(): void {
    this.subscription = this.importLcStateService.state$.subscribe((state) => {
      this.submittedBy = state.applicantName || 'Unknown Applicant';
      
      this.summary = {
        typeOfLc: state.lcType || '-',
        invoiceAmount: state.invoiceAmount || '-',
        currency: state.currency || '-',
        beneficiaryName: state.beneficiaryName || '-',
        beneficiaryCountry: state.beneficiaryCountry || '-',
        incoterms: state.incoterm || '-',
        goodsDescription: state.goodsDescription || '-',
        expectedShipment: state.shipmentPeriod || '-'
      };

      if (state.poReferenceFileName) {
        this.uploadedReference = {
          fileName: state.poReferenceFileName,
          uploadedAt: new Date().toLocaleDateString() // Mock date as we don't save upload time yet
        };
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  print(): void {
    window.print();
  }

  viewFile(): void {
    console.log('View file clicked');
    // Implement file viewing logic
  }

  downloadFile(): void {
    console.log('Download file clicked');
    // Implement file download logic
  }

  viewSubmittedDetails(): void {
    console.log('View details clicked');
    // Navigate to details view or show modal
  }

  downloadAcknowledgement(): void {
    console.log('Download acknowledgement clicked');
    // Implement acknowledgement download
  }

  saveReference(): void {
    console.log('Save reference clicked');
    // Implement save reference logic
  }

  contactRO(): void {
    console.log('Contact RO clicked');
    // Implement contact logic
  }
}
