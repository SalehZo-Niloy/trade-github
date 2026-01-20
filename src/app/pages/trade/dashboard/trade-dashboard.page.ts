import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TradeLayoutComponent } from '../../../styles/layout/trade-layout.component';
import { TradeRequestService, TradeRequest } from '../../../services/trade-request.service';
import { ExportBillService, ExportBill } from '../../../services/export-bill.service';
import { ExportProceedService, ExportProceed } from '../../../services/export-proceed.service';
import { TradeStatus } from '../../../services/workflow.service';
import { combineLatest, map } from 'rxjs';
import { RouterLink } from '@angular/router';

interface HistoryEvent {
  status: string;
  date: string;
  time: string;
  actor: string;
  comment?: string;
}

interface TransactionSummary {
  id: string;
  type: 'REQUEST' | 'EXPORT_BILL' | 'EXPORT_PROCEED';
  customer: string;
  reference: string;
  amount: number;
  currency: string;
  status: string;
  date: string;
  link: string;
  history: HistoryEvent[];
}

@Component({
  selector: 'app-trade-dashboard-page',
  standalone: true,
  imports: [CommonModule, TradeLayoutComponent, RouterLink],
  templateUrl: './trade-dashboard.page.html'
})
export class TradeDashboardPageComponent implements OnInit {
  stats = {
    totalTransactions: 0,
    pendingAction: 0,
    completed: 0,
    rejected: 0
  };

  recentTransactions: TransactionSummary[] = [];
  expandedTransactionId: string | null = null;

  constructor(
    private requestService: TradeRequestService,
    private billService: ExportBillService,
    private proceedService: ExportProceedService
  ) {}

  toggleHistory(id: string) {
    if (this.expandedTransactionId === id) {
      this.expandedTransactionId = null;
    } else {
      this.expandedTransactionId = id;
    }
  }

  ngOnInit() {
    combineLatest([
      this.requestService.requests$,
      this.billService.bills$,
      this.proceedService.proceeds$
    ]).pipe(
      map(([requests, bills, proceeds]) => {
        const allTransactions: TransactionSummary[] = [];

        // Map Requests
        requests.forEach(r => {
          allTransactions.push({
            id: r.id,
            type: 'REQUEST',
            customer: r.applicant.name,
            reference: r.exportLC.lcNo,
            amount: parseFloat(r.exportLC.amount || '0'),
            currency: r.exportLC.currency || 'USD',
            status: r.status,
            date: r.submissionDate || new Date().toISOString(),
            link: `/trade/dc-advising/to/request/${r.id}`,
            history: r.history || []
          });
        });

        // Map Bills
        bills.forEach(b => {
          allTransactions.push({
            id: b.id,
            type: 'EXPORT_BILL',
            customer: b.customerName,
            reference: b.lcNumber,
            amount: b.amount,
            currency: b.currency,
            status: b.status,
            date: b.updatedAt,
            link: `/trade/export-bill/to/request/${b.id}`,
            history: b.history || []
          });
        });

        // Map Proceeds
        proceeds.forEach(p => {
          allTransactions.push({
            id: p.id,
            type: 'EXPORT_PROCEED',
            customer: p.customer,
            reference: p.refBill,
            amount: p.amount,
            currency: p.currency,
            status: p.status,
            date: p.date,
            link: `/trade/export-proceed/to/details/${p.id}`,
            history: p.history || []
          });
        });

        // Sort by date descending
        return allTransactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      })
    ).subscribe(transactions => {
      this.recentTransactions = transactions;
      this.calculateStats(transactions);
    });
  }

  calculateStats(transactions: TransactionSummary[]) {
    this.stats.totalTransactions = transactions.length;
    
    this.stats.pendingAction = transactions.filter(t => 
      [
        TradeStatus.SUBMITTED, 
        TradeStatus.RO_VALIDATION, 
        TradeStatus.TO_TRADE_OFFICER, 
        TradeStatus.PENDING_APPROVAL, 
        TradeStatus.DISCREPANCY_RAISED,
        TradeStatus.SWIFT_VALIDATED,
        TradeStatus.VERIFIED
      ].includes(t.status as TradeStatus)
    ).length;

    this.stats.completed = transactions.filter(t => 
      [
        TradeStatus.APPROVED, 
        TradeStatus.REALIZED, 
        TradeStatus.DC_ADVICE_ISSUED, 
        TradeStatus.SENT_TO_IMPORTER
      ].includes(t.status as TradeStatus)
    ).length;

    this.stats.rejected = transactions.filter(t => 
      [
        TradeStatus.REJECTED, 
        TradeStatus.RETURNED,
        TradeStatus.RETURNED_TO_CUSTOMER
      ].includes(t.status as TradeStatus)
    ).length;
  }

  getStatusClass(status: string): string {
    switch (status) {
      case TradeStatus.APPROVED:
      case TradeStatus.REALIZED:
      case TradeStatus.DC_ADVICE_ISSUED:
      case TradeStatus.SENT_TO_IMPORTER:
      case TradeStatus.SWIFT_VALIDATED:
      case TradeStatus.VERIFIED:
        return 'bg-green-100 text-green-800';
      case TradeStatus.SUBMITTED:
      case TradeStatus.RO_VALIDATION:
      case TradeStatus.TO_TRADE_OFFICER:
      case TradeStatus.PENDING_APPROVAL:
        return 'bg-blue-100 text-blue-800';
      case TradeStatus.RETURNED:
      case TradeStatus.DISCREPANCY_RAISED:
      case TradeStatus.RETURNED_TO_CUSTOMER:
        return 'bg-orange-100 text-orange-800';
      case TradeStatus.REJECTED:
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  formatType(type: string): string {
    return type.replace('_', ' ');
  }
}
