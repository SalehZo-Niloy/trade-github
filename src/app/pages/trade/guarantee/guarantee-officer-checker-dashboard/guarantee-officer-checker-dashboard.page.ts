import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TradeLayoutComponent } from '../../../../styles/layout/trade-layout.component';
import { UiTableComponent } from '../../../../components/ui/ui-table.component';
import { tradeTheme } from '../../../../styles/theme';

interface SummaryCard {
  id: string;
  label: string;
  description: string;
  count: number;
  bgClass: string;
  icon: string;
}

interface PendingApprovalRow {
  applicationId: string;
  customerName: string;
  cif: string;
  guaranteeType: string;
  amount: string;
  amountCurrency: string;
  expiryDate: string;
  escalatedBy: string;
  escalatedRole: string;
  escalationDate: string;
  escalationTime: string;
  status: string;
}

interface ApprovalActivityItem {
  id: string;
  title: string;
  guaranteeType: string;
  amount: string;
  status: 'approved' | 'rejected';
  officer: string;
  reason?: string;
  dateTime: string;
}

@Component({
  selector: 'app-guarantee-officer-checker-dashboard-page',
  standalone: true,
  imports: [CommonModule, TradeLayoutComponent, UiTableComponent],
  templateUrl: './guarantee-officer-checker-dashboard.page.html'
})
export class GuaranteeOfficerCheckerDashboardPageComponent {
  theme = tradeTheme;

  summaryCards: SummaryCard[] = [
    {
      id: 'pending',
      label: 'Pending Approval',
      description: 'Requires immediate action',
      count: 8,
      bgClass: 'bg-blue-600 text-white',
      icon: '⏱'
    },
    {
      id: 'approved',
      label: 'Approved Today',
      description: 'Successfully authorized',
      count: 12,
      bgClass: 'bg-emerald-600 text-white',
      icon: '✔'
    },
    {
      id: 'rejected',
      label: 'Rejected Today',
      description: 'Returned with remarks',
      count: 2,
      bgClass: 'bg-rose-600 text-white',
      icon: '✖'
    },
    {
      id: 'returned',
      label: 'Returned to Officer',
      description: 'Awaiting correction',
      count: 3,
      bgClass: 'bg-amber-500 text-white',
      icon: '↩️'
    }
  ];

  pendingApprovalRows: PendingApprovalRow[] = [
    {
      applicationId: 'GTR-2024-001234',
      customerName: 'John Mitchell Trading LLC',
      cif: '1234567890',
      guaranteeType: 'Performance Guarantee',
      amount: '500,000.00',
      amountCurrency: 'AED',
      expiryDate: 'Dec 31, 2024',
      escalatedBy: 'Sarah Ahmed',
      escalatedRole: 'Guarantee Officer',
      escalationDate: 'Jan 11, 2024',
      escalationTime: '14:30',
      status: 'Pending Approval'
    },
    {
      applicationId: 'GTR-2024-001235',
      customerName: 'Al Noor Industries',
      cif: '9876543210',
      guaranteeType: 'Bid Bond',
      amount: '250,000.00',
      amountCurrency: 'AED',
      expiryDate: 'Nov 30, 2024',
      escalatedBy: 'Ahmed Hassan',
      escalatedRole: 'Guarantee Officer',
      escalationDate: 'Jan 11, 2024',
      escalationTime: '13:15',
      status: 'Pending Approval'
    },
    {
      applicationId: 'GTR-2024-001236',
      customerName: 'Emirates Construction Co.',
      cif: '551234567',
      guaranteeType: 'Advance Payment Guarantee',
      amount: '750,000.00',
      amountCurrency: 'AED',
      expiryDate: 'Oct 15, 2024',
      escalatedBy: 'Sarah Ahmed',
      escalatedRole: 'Guarantee Officer',
      escalationDate: 'Jan 11, 2024',
      escalationTime: '11:45',
      status: 'Pending Approval'
    },
    {
      applicationId: 'GTR-2024-001237',
      customerName: 'Global Tech Solutions',
      cif: '777889990',
      guaranteeType: 'Financial Guarantee',
      amount: '1,000,000.00',
      amountCurrency: 'AED',
      expiryDate: 'Sep 30, 2024',
      escalatedBy: 'Ahmed Hassan',
      escalatedRole: 'Guarantee Officer',
      escalationDate: 'Jan 11, 2024',
      escalationTime: '10:20',
      status: 'Pending Approval'
    }
  ];

  approvalActivity: ApprovalActivityItem[] = [
    {
      id: 'GTR-2024-001230',
      title: 'GTR-2024-001230 Approved',
      guaranteeType: 'Performance Guarantee',
      amount: 'AED 300,000.00',
      status: 'approved',
      officer: 'Sarah Ahmed',
      dateTime: 'Jan 11, 2024 09:45'
    },
    {
      id: 'GTR-2024-001228',
      title: 'GTR-2024-001228 Approved',
      guaranteeType: 'Bid Bond',
      amount: 'AED 150,000.00',
      status: 'approved',
      officer: 'Ahmed Hassan',
      dateTime: 'Jan 11, 2024 08:30'
    },
    {
      id: 'GTR-2024-001225',
      title: 'GTR-2024-001225 Rejected',
      guaranteeType: 'Financial Guarantee',
      amount: 'AED 2,000,000.00',
      status: 'rejected',
      officer: 'Sarah Ahmed',
      reason: 'Credit limit concern',
      dateTime: 'Jan 10, 2024 16:15'
    },
    {
      id: 'GTR-2024-001220',
      title: 'GTR-2024-001220 Approved',
      guaranteeType: 'Advance Payment Guarantee',
      amount: 'AED 450,000.00',
      status: 'approved',
      officer: 'Ahmed Hassan',
      dateTime: 'Jan 10, 2024 14:20'
    }
  ];

  constructor(private router: Router) {}

  reviewApplication(row: PendingApprovalRow): void {
    this.router.navigate(['/trade', 'guarantee-officer-checker-dashboard', 'application-review']);
  }
}
