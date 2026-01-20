import { Routes } from '@angular/router';
import { TradeDashboardPageComponent } from '../pages/trade/dashboard/trade-dashboard.page';
import { GuaranteeApplicationPageComponent } from '../pages/trade/guarantee/guarantee-application/guarantee-application.page';
import { GuaranteeOfficerDashboardPageComponent } from '../pages/trade/guarantee/officer-dashboard/officer-dashboard.page';
import { GuaranteeApplicationReviewPageComponent } from '../pages/trade/guarantee/officer-dashboard/guarantee-application-review/guarantee-application-review.page';
import { CreateSwiftMessagePageComponent } from '../pages/trade/guarantee/officer-dashboard/create-swift-message/create-swift-message.page';
import { GuaranteeOfficerCheckerDashboardPageComponent } from '../pages/trade/guarantee/guarantee-officer-checker-dashboard/guarantee-officer-checker-dashboard.page';
import { GuaranteeCheckerApplicationReviewPageComponent } from '../pages/trade/guarantee/guarantee-officer-checker-dashboard/application-review/application-review.page';
import { ImportApplicationPageComponent } from '../pages/trade/import/import-application/import-application.page';
import { ImportSubmittingPageComponent } from '../pages/trade/import/import-application/submitting/submitting.page';
import { ImportCustomerViewPageComponent } from '../pages/trade/import/import-application/customer-view/customer-view.page';
import { ImportDocumentHandoverPageComponent } from '../pages/trade/import/import-application/document-handover/document-handover.page';
import { DocumentHandoverViewComponent } from '../pages/trade/import/import-application/document-handover/document-handover-view.component';
import { ImportPendingReviewPageComponent } from '../pages/trade/import/import-application/pending-review/pending-review.page';
import { PendingReviewViewComponent } from '../pages/trade/import/import-application/pending-review/pending-review-view.component';
import { ImportLcIssuancePageComponent } from '../pages/trade/import/import-application/lc-issuance/lc-issuance.page';
import { LcChargeCollectionPageComponent } from '../pages/trade/import/import-application/lc-charge-collection/lc-charge-collection.page';
import { LcMarginCollectionPageComponent } from '../pages/trade/import/import-application/lc-margin-collection/lc-margin-collection.page';
import { LcAmendmentRequestPageComponent } from '../pages/trade/import/import-application/lc-amendment-request/lc-amendment-request.page';
import { DocumentReceivePageComponent } from '../pages/trade/import/import-application/document-receive/document-receive.page';
import { DocumentCheckingPageComponent } from '../pages/trade/import/import-application/document-checking/document-checking.page';
import { DiscrepancyRecordPageComponent } from '../pages/trade/import/import-application/discrepancy-record/discrepancy-record.page';
import { DiscrepancyRecordConfirmationComponent } from '../pages/trade/import/import-application/discrepancy-record/discrepancy-record-confirmation.component';
import { DiscrepancyRecordNotificationComponent } from '../pages/trade/import/import-application/discrepancy-record/discrepancy-record-notification.component';
import { DiscrepancyRecordRejectComponent } from '../pages/trade/import/import-application/discrepancy-record/discrepancy-record-reject.component';
import { LcSettlementDecisionPageComponent } from '../pages/trade/import/import-application/lc-settlement-decision/lc-settlement-decision.page';
import { PadCreationPageComponent } from '../pages/trade/import/import-application/pad-creation/pad-creation.page';
import { ExecutePaymentPageComponent } from '../pages/trade/import/import-application/execute-payment/execute-payment.page';
import { LcClosurePageComponent } from '../pages/trade/import/import-application/lc-closure/lc-closure.page';

export const tradeRoutes: Routes = [
  {
    path: 'dashboard',
    component: TradeDashboardPageComponent
  },
  {
    path: 'guarantee',
    component: GuaranteeApplicationPageComponent
  },
  {
    path: 'guarantee-officer-dashboard',
    component: GuaranteeOfficerDashboardPageComponent
  },
  {
    path: 'guarantee-officer-checker-dashboard',
    component: GuaranteeOfficerCheckerDashboardPageComponent
  },
  {
    path: 'guarantee-officer-checker-dashboard/application-review',
    component: GuaranteeCheckerApplicationReviewPageComponent
  },
  {
    path: 'guarantee-application-review',
    component: GuaranteeApplicationReviewPageComponent
  },
  {
    path: 'create-swift-message',
    component: CreateSwiftMessagePageComponent
  },
  {
        path: 'import',
        component: ImportApplicationPageComponent,
      },
      {
        path: 'import/submitting',
        component: ImportSubmittingPageComponent,
      },
      {
        path: 'import/customer-view',
        component: ImportCustomerViewPageComponent,
      },
      {
        path: 'import/document-handover',
        component: ImportDocumentHandoverPageComponent,
      },
      {
        path: 'import/document-handover/view/:reference',
        component: DocumentHandoverViewComponent,
      },
      {
        path: 'import/pending-review',
        component: ImportPendingReviewPageComponent,
      },
      {
        path: 'import/pending-review/view/:reference',
        component: PendingReviewViewComponent,
      },
      {
        path: 'import/lc-issuance',
        component: ImportLcIssuancePageComponent,
      },
      {
        path: 'import/lc-charge-collection',
        component: LcChargeCollectionPageComponent,
      },
      {
        path: 'import/lc-margin-collection',
        component: LcMarginCollectionPageComponent,
      },
      {
        path: 'import/lc-amendment-request',
        component: LcAmendmentRequestPageComponent,
      },
      {
        path: 'import/document-receive',
        component: DocumentReceivePageComponent,
      },
      {
        path: 'import/document-checking',
        component: DocumentCheckingPageComponent,
      },
      {
        path: 'import/discrepancy-record',
        component: DiscrepancyRecordPageComponent,
      },
      {
        path: 'import/discrepancy-record/confirmation',
        component: DiscrepancyRecordConfirmationComponent,
      },
      {
        path: 'import/discrepancy-record/notification',
        component: DiscrepancyRecordNotificationComponent,
      },
      {
        path: 'import/discrepancy-record/reject',
        component: DiscrepancyRecordRejectComponent,
      },
      {
        path: 'import/lc-settlement-decision',
        component: LcSettlementDecisionPageComponent,
      },
      {
        path: 'import/pad-creation',
        component: PadCreationPageComponent,
      },
      {
        path: 'import/execute-payment',
        component: ExecutePaymentPageComponent,
      },
      {
        path: 'import/lc-closure',
        component: LcClosurePageComponent,
      },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }
];
