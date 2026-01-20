import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TradeLayoutComponent } from '../../../../../styles/layout/trade-layout.component';

export interface ExportProceed {
  id: string;
  customer: string;
  refBill: string;
  refLC: string;
  amount: number;
  currency: string;
  status: 'Received' | 'Swift Validated' | 'Pending Approval' | 'Discrepancy Raised' | 'Realized';
  date: string;
}

@Component({
  selector: 'app-export-proceed-to-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, TradeLayoutComponent],
  templateUrl: './export-proceed-to-dashboard.page.html'
})
export class ExportProceedToDashboardPageComponent implements OnInit {
  proceeds: ExportProceed[] = [
    { id: 'PR-2026-232914', customer: 'New Customer Ltd', refBill: 'BC-25-22', refLC: 'LC-25-7', amount: 3390.00, currency: 'USD', status: 'Received', date: '2026-01-19' },
    { id: 'PR-2026-757247', customer: 'New Customer Ltd', refBill: 'BC-25-45', refLC: 'LC-25-57', amount: 53907.00, currency: 'USD', status: 'Received', date: '2026-01-19' },
    { id: 'PR-2025-000001', customer: 'Alpha Exports Ltd', refBill: 'BC-25-001', refLC: 'LC-25-001', amount: 50000.00, currency: 'USD', status: 'Swift Validated', date: '2026-01-18' },
    { id: 'PR-2025-000002', customer: 'Beta Textiles Inc', refBill: 'BC-25-010', refLC: 'LC-25-005', amount: 125000.00, currency: 'EUR', status: 'Swift Validated', date: '2026-01-18' },
    { id: 'PR-2025-000003', customer: 'Gamma Garments', refBill: 'BC-25-045', refLC: 'LC-25-020', amount: 75000.00, currency: 'USD', status: 'Pending Approval', date: '2026-01-17' },
    { id: 'PR-2025-000004', customer: 'Delta Foods', refBill: 'BC-25-067', refLC: 'LC-25-033', amount: 30000.00, currency: 'GBP', status: 'Discrepancy Raised', date: '2026-01-16' },
    { id: 'PR-2025-000005', customer: 'Alpha Exports Ltd', refBill: 'BC-25-003', refLC: 'LC-25-002', amount: 100000.00, currency: 'USD', status: 'Realized', date: '2026-01-15' },
  ];

  searchTerm: string = '';
  
  stats = {
    total: 7,
    realized: 1,
    pendingAction: 5,
    discrepancies: 1
  };

  constructor() {}

  ngOnInit() {}

  get filteredProceeds() {
    return this.proceeds.filter(p => 
      p.id.toLowerCase().includes(this.searchTerm.toLowerCase()) || 
      p.customer.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  receiveProceed() {
    const newId = `PR-2026-${Math.floor(Math.random() * 1000000)}`;
    this.proceeds.unshift({
      id: newId,
      customer: 'New Customer Ltd',
      refBill: 'BC-25-NEW',
      refLC: 'LC-25-NEW',
      amount: 10000.00,
      currency: 'USD',
      status: 'Received',
      date: new Date().toISOString().split('T')[0]
    });
    this.stats.total++;
    this.stats.pendingAction++;
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Received': return 'bg-blue-100 text-blue-800';
      case 'Swift Validated': return 'bg-indigo-100 text-indigo-800';
      case 'Pending Approval': return 'bg-purple-100 text-purple-800';
      case 'Discrepancy Raised': return 'bg-red-100 text-red-800';
      case 'Realized': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }
}
