import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TradeLayoutComponent } from '../../../../styles/layout/trade-layout.component';
import { UiTableComponent } from '../../../../components/ui/ui-table.component';
import { tradeTheme } from '../../../../styles/theme';

interface PriorityItem {
  id: string;
  label: string;
  description: string;
  count: number;
  badgeClass: string;
  icon: string;
}

interface InboxTab {
  id: string;
  label: string;
  count: number;
}

interface ApplicationRow {
  id: string;
  customer: string;
  type: string;
  amount: string;
  submitted: string;
  status: string;
  statusVariant: 'primary' | 'warning';
  sla: string;
}

interface IssuanceRow {
  id: string;
  type: string;
  amount: string;
  approvalDate: string;
  issuanceStatus: string;
  accountingStatus: string;
}

interface AmendmentRow {
  id: string;
  originalRef: string;
  amendmentType: string;
  financialImpact: string;
  submitted: string;
  status: string;
}

interface ClaimRow {
  id: string;
  guaranteeRef: string;
  claimAmount: string;
  submitted: string;
  status: string;
}

interface MetricItem {
  label: string;
  value: number | string;
}

interface QueueItem {
  id: string;
  title: string;
  description: string;
  age: string;
}

interface ActivityItem {
  label: string;
  reference: string;
  timeAgo: string;
  dotClass: string;
}

interface NotificationItem {
  title: string;
  description: string;
  timeAgo: string;
  borderClass: string;
}

@Component({
  selector: 'app-guarantee-officer-dashboard-page',
  standalone: true,
  imports: [CommonModule, TradeLayoutComponent, UiTableComponent],
  templateUrl: './officer-dashboard.page.html'
})
export class GuaranteeOfficerDashboardPageComponent {
  theme = tradeTheme;

  constructor(private router: Router) {}

  priorityItems: PriorityItem[] = [
    {
      id: 'new',
      label: 'New Applications',
      description: 'Awaiting review & escalation',
      count: 12,
      badgeClass: 'bg-indigo-50 text-indigo-700',
      icon: '📄'
    },
    {
      id: 'returned',
      label: 'Returned for Correction',
      description: 'Customer action required',
      count: 5,
      badgeClass: 'bg-amber-50 text-amber-700',
      icon: '↩️'
    },
    {
      id: 'amendments',
      label: 'Pending Amendments',
      description: 'Amendment requests awaiting review',
      count: 7,
      badgeClass: 'bg-violet-50 text-violet-700',
      icon: '✏️'
    },
    {
      id: 'claims',
      label: 'Pending Claims',
      description: 'Claims awaiting validation',
      count: 3,
      badgeClass: tradeTheme.status.danger,
      icon: '⚖️'
    },
    {
      id: 'issuance',
      label: 'Issuance Pending',
      description: 'Awaiting issuance & posting',
      count: 8,
      badgeClass: tradeTheme.status.success,
      icon: '✅'
    }
  ];

  inboxTabs: InboxTab[] = [
    { id: 'applications', label: 'Guarantee Applications', count: 12 },
    { id: 'issuance', label: 'Issuance & Accounting', count: 6 },
    { id: 'amendments', label: 'Amendment Requests', count: 4 },
    { id: 'claims', label: 'Claim Requests', count: 3 }
  ];

  applications: ApplicationRow[] = [
    {
      id: 'GTR-2024-001234',
      customer: 'John Mitchell Trading LLC',
      type: 'Performance',
      amount: 'AED 500,000',
      submitted: 'Jan 11, 2024',
      status: 'Submitted',
      statusVariant: 'primary',
      sla: 'On Time'
    },
    {
      id: 'GTR-2024-001235',
      customer: 'ABC Construction Co.',
      type: 'Bid Bond',
      amount: 'AED 250,000',
      submitted: 'Jan 10, 2024',
      status: 'Return',
      statusVariant: 'warning',
      sla: '01:15'
    },
    {
      id: 'GTR-2024-001236',
      customer: 'Global Trading LLC',
      type: 'Financial',
      amount: 'USD 100,000',
      submitted: 'Jan 9, 2024',
      status: 'Submit',
      statusVariant: 'primary',
      sla: '02:05'
    }
  ];

  issuanceRows: IssuanceRow[] = [
    {
      id: 'GTR-2024-001230',
      type: 'Performance',
      amount: 'AED 750,000',
      approvalDate: 'Jan 10, 2024',
      issuanceStatus: 'Pending',
      accountingStatus: 'Posted'
    },
    {
      id: 'GTR-2024-001231',
      type: 'Bid Bond',
      amount: 'AED 300,000',
      approvalDate: 'Jan 7, 2024',
      issuanceStatus: 'Issued',
      accountingStatus: 'Posted'
    },
    {
      id: 'GTR-2024-001232',
      type: 'Financial',
      amount: 'USD 200,000',
      approvalDate: 'Jan 6, 2024',
      issuanceStatus: 'Pending issuance',
      accountingStatus: 'Not posted'
    }
  ];

  amendmentRows: AmendmentRow[] = [
    {
      id: 'AMD-2024-001',
      originalRef: 'GTR-2024-001200',
      amendmentType: 'Amount Increase',
      financialImpact: '+AED 100,000',
      submitted: 'Jan 11, 2024',
      status: 'Submitted'
    },
    {
      id: 'AMD-2024-002',
      originalRef: 'GTR-2024-001215',
      amendmentType: 'Amount increase',
      financialImpact: '+ AED 150,000',
      submitted: 'Jan 9, 2024',
      status: 'Pending approval'
    },
    {
      id: 'AMD-2024-003',
      originalRef: 'GTR-2024-001210',
      amendmentType: 'Beneficiary change',
      financialImpact: 'No change',
      submitted: 'Jan 8, 2024',
      status: 'Returned'
    }
  ];

  claimRows: ClaimRow[] = [
    {
      id: 'CLM-2024-001',
      guaranteeRef: 'GTR-2024-001180',
      claimAmount: 'AED 50,000',
      submitted: 'Jan 10, 2024',
      status: 'New'
    },
    {
      id: 'CLM-2024-002',
      guaranteeRef: 'GTR-2024-001140',
      claimAmount: 'AED 250,000',
      submitted: 'Jan 8, 2024',
      status: 'Pending documents'
    },
    {
      id: 'CLM-2024-003',
      guaranteeRef: 'GTR-2024-001130',
      claimAmount: 'USD 150,000',
      submitted: 'Jan 7, 2024',
      status: 'Settled'
    }
  ];

  performanceMetrics: MetricItem[] = [
    { label: 'Guarantees Issued', value: 4 },
    { label: 'Amendments Processed', value: 5 },
    { label: 'Claims Settled', value: 1 }
  ];

  stockMetrics: MetricItem[] = [
    { label: 'Outstanding Guarantees', value: 156 },
    { label: 'Claims in Progress', value: 8 }
  ];

  correctionQueue: QueueItem[] = [
    {
      id: 'GTR-2024-001235',
      title: 'Missing board resolution',
      description: 'Customer notified',
      age: '2 days ago'
    },
    {
      id: 'AMD-2024-002',
      title: 'Expiry reduction approval',
      description: 'Awaiting RM confirmation',
      age: '1 day ago'
    },
    {
      id: 'CLM-2024-003',
      title: 'Incomplete claim documents',
      description: 'Customer notified',
      age: '3 hours ago'
    }
  ];

  recentActivity: ActivityItem[] = [
    {
      label: 'Guarantee Issued',
      reference: 'GTR-2024-001239',
      timeAgo: '10 minutes ago',
      dotClass: 'bg-emerald-500'
    },
    {
      label: 'Application Escalated',
      reference: 'GTR-2024-001230',
      timeAgo: '25 minutes ago',
      dotClass: 'bg-blue-500'
    },
    {
      label: 'Sent Back for Correction',
      reference: 'GTR-2024-001235',
      timeAgo: '1 hour ago',
      dotClass: 'bg-amber-500'
    },
    {
      label: 'Amendment Processed',
      reference: 'AMD-2024-001',
      timeAgo: '2 hours ago',
      dotClass: 'bg-violet-500'
    },
    {
      label: 'Claim Settled',
      reference: 'CLM-2024-001',
      timeAgo: '3 hours ago',
      dotClass: 'bg-rose-500'
    }
  ];

  notifications: NotificationItem[] = [
    {
      title: 'New Submission',
      description: 'GTR-2024-001237 received',
      timeAgo: '5 minutes ago',
      borderClass: 'border-blue-200'
    },
    {
      title: 'Checker Approved',
      description: 'GTR-2024-001230 approved',
      timeAgo: '15 minutes ago',
      borderClass: 'border-emerald-200'
    },
    {
      title: 'Resubmission',
      description: 'GTR-2024-001235 corrected',
      timeAgo: '30 minutes ago',
      borderClass: 'border-amber-200'
    }
  ];

  activeInboxTab = 'applications';

  setActiveInboxTab(tabId: string): void {
    this.activeInboxTab = tabId;
  }

  reviewApplication(row: ApplicationRow): void {
    this.router.navigate(['/trade', 'guarantee-application-review']);
  }

  filterTableByPriority(priorityId: string): void {
    if (priorityId === 'amendments') {
      this.activeInboxTab = 'amendments';
      return;
    }
    if (priorityId === 'claims') {
      this.activeInboxTab = 'claims';
      return;
    }
    if (priorityId === 'issuance') {
      this.activeInboxTab = 'issuance';
      return;
    }
    this.activeInboxTab = 'applications';
  }
}
