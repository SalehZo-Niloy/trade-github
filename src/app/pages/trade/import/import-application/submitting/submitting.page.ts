import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TradeLayoutComponent } from '../../../../../styles/layout/trade-layout.component';
import { UiInputComponent } from '../../../../../components/ui/ui-input.component';
import { UiButtonComponent } from '../../../../../components/ui/ui-button.component';
import { ImportLcStateService } from '../../../../../services/import-lc-state.service';

@Component({
  selector: 'app-import-submitting-page',
  standalone: true,
  imports: [CommonModule, FormsModule, TradeLayoutComponent, UiInputComponent, UiButtonComponent],
  templateUrl: './submitting.page.html',
})
export class ImportSubmittingPageComponent implements OnInit, OnDestroy {
  requestType = 'Initiate Import Letter of Credit';
  lcType = '';
  purposeOfImport = '';

  applicantName = '';
  accountNumber = '';
  contactEmail = '';
  contactPhone = '';

  beneficiaryName = '';
  beneficiaryCountry = '';
  beneficiaryBankName = '';
  beneficiaryBankCountry = '';

  poReference = '';
  invoiceDate = '';
  invoiceAmount = '';
  currency = '';

  goodsDescription = '';
  quantity = '';
  shipmentPeriod = '';
  portOfLoading = '';
  portOfDischarge = '';

  incoterm = '';
  partialShipmentAllowed: 'yes' | 'no' | '' = '';
  transshipmentAllowed: 'yes' | 'no' | '' = '';

  preferredIssuingBranch = '';
  preferredAdvisingBank = '';
  remarks = '';

  confirm = false;

  lcTypes = ['Sight LC', 'Usance LC', 'Deferred LC'];
  countries = ['Bangladesh', 'United States', 'China', 'United Arab Emirates', 'India'];
  currencies = ['USD', 'EUR', 'BDT', 'GBP'];
  incoterms = ['FOB', 'CIF', 'CFR', 'DAP', 'EXW'];
  branches = ['Main Branch', 'Gulshan Branch', 'Motijheel Branch'];

  statusMessage = '';
  statusType: 'success' | 'error' | '' = '';

  poReferenceFile: File | null = null;

  private subscription: Subscription = new Subscription();

  constructor(
    private router: Router,
    private importLcStateService: ImportLcStateService,
  ) {}

  ngOnInit(): void {
    this.subscription = this.importLcStateService.state$.subscribe((state) => {
      this.requestType = state.requestType;
      this.lcType = state.lcType;
      this.purposeOfImport = state.purposeOfImport;
      this.applicantName = state.applicantName;
      this.accountNumber = state.accountNumber;
      this.contactEmail = state.contactEmail;
      this.contactPhone = state.contactPhone;
      this.beneficiaryName = state.beneficiaryName;
      this.beneficiaryCountry = state.beneficiaryCountry;
      this.beneficiaryBankName = state.beneficiaryBankName;
      this.beneficiaryBankCountry = state.beneficiaryBankCountry;
      this.poReference = state.poReference;
      this.invoiceDate = state.invoiceDate;
      this.invoiceAmount = state.invoiceAmount;
      this.currency = state.currency;
      this.goodsDescription = state.goodsDescription;
      this.quantity = state.quantity;
      this.shipmentPeriod = state.shipmentPeriod;
      this.portOfLoading = state.portOfLoading;
      this.portOfDischarge = state.portOfDischarge;
      this.incoterm = state.incoterm;
      this.partialShipmentAllowed = state.partialShipmentAllowed;
      this.transshipmentAllowed = state.transshipmentAllowed;
      this.preferredIssuingBranch = state.preferredIssuingBranch;
      this.preferredAdvisingBank = state.preferredAdvisingBank;
      this.remarks = state.remarks;
      this.confirm = state.confirm;

      if (state.poReferenceFile) {
        this.poReferenceFile = state.poReferenceFile;
      }
    });
  }

  ngOnDestroy(): void {
    this.updateServiceState();
    this.subscription.unsubscribe();
  }

  updateServiceState(): void {
    this.importLcStateService.updateState({
      requestType: this.requestType,
      lcType: this.lcType,
      purposeOfImport: this.purposeOfImport,
      applicantName: this.applicantName,
      accountNumber: this.accountNumber,
      contactEmail: this.contactEmail,
      contactPhone: this.contactPhone,
      beneficiaryName: this.beneficiaryName,
      beneficiaryCountry: this.beneficiaryCountry,
      beneficiaryBankName: this.beneficiaryBankName,
      beneficiaryBankCountry: this.beneficiaryBankCountry,
      poReference: this.poReference,
      poReferenceFileName: this.poReferenceFile?.name || '',
      invoiceDate: this.invoiceDate,
      invoiceAmount: this.invoiceAmount,
      currency: this.currency,
      goodsDescription: this.goodsDescription,
      quantity: this.quantity,
      shipmentPeriod: this.shipmentPeriod,
      portOfLoading: this.portOfLoading,
      portOfDischarge: this.portOfDischarge,
      incoterm: this.incoterm,
      partialShipmentAllowed: this.partialShipmentAllowed,
      transshipmentAllowed: this.transshipmentAllowed,
      preferredIssuingBranch: this.preferredIssuingBranch,
      preferredAdvisingBank: this.preferredAdvisingBank,
      remarks: this.remarks,
      confirm: this.confirm,
      poReferenceFile: this.poReferenceFile,
    });
  }

  saveDraft(): void {
    this.updateServiceState();
    this.statusType = 'success';
    this.statusMessage = 'Draft saved.';
  }

  submitRequest(): void {
    // No required field validation — submit everything as-is
    this.updateServiceState();
    this.statusType = 'success';
    this.statusMessage = 'LC initiation request submitted.';

    // Navigate to customer view
    this.router.navigate(['/trade', 'import', 'customer-view']);
  }

  cancel(): void {
    this.router.navigate(['/trade', 'import']);
  }

  onFileSelected(event: Event, field: string): void {
    const input = event.target as HTMLInputElement;
    const file = input.files && input.files.length > 0 ? input.files[0] : null;
    if (field === 'poReference') {
      this.poReferenceFile = file;
      this.updateServiceState();
    }
  }

  removeFile(field: string): void {
    if (field === 'poReference') {
      this.poReferenceFile = null;
      this.updateServiceState();
    }
  }

  onConfirmChange(val: boolean): void {
    this.confirm = val;
  }

  refreshForm(): void {
    this.importLcStateService.resetState();
    this.requestType = 'Initiate Import Letter of Credit';
    this.lcType = '';
    this.purposeOfImport = '';
    this.applicantName = '';
    this.accountNumber = '';
    this.contactEmail = '';
    this.contactPhone = '';
    this.beneficiaryName = '';
    this.beneficiaryCountry = '';
    this.beneficiaryBankName = '';
    this.beneficiaryBankCountry = '';
    this.poReference = '';
    this.poReferenceFile = null;
    this.invoiceDate = '';
    this.invoiceAmount = '';
    this.currency = '';
    this.goodsDescription = '';
    this.quantity = '';
    this.shipmentPeriod = '';
    this.portOfLoading = '';
    this.portOfDischarge = '';
    this.incoterm = '';
    this.partialShipmentAllowed = '';
    this.transshipmentAllowed = '';
    this.preferredIssuingBranch = '';
    this.preferredAdvisingBank = '';
    this.remarks = '';
    this.confirm = false;
    this.statusMessage = '';
    this.statusType = '';
  }
}
