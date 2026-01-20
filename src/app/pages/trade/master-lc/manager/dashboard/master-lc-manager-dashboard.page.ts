import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TradeLayoutComponent } from '../../../../../styles/layout/trade-layout.component';
import { MasterLCService, MasterLCRequest } from '../../../../../services/master-lc.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-master-lc-manager-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, TradeLayoutComponent],
  templateUrl: './master-lc-manager-dashboard.page.html'
})
export class MasterLCManagerDashboardPageComponent implements OnInit {
  requests$: Observable<MasterLCRequest[]>;
  pendingApprovalCount: number = 0;
  totalRequestsCount: number = 0;
  issuedCount: number = 0;
  rejectedCount: number = 0;

  constructor(private masterLCService: MasterLCService) {
    this.requests$ = this.masterLCService.requests$;
  }

  ngOnInit() {
    this.masterLCService.requests$.subscribe((reqs: MasterLCRequest[]) => {
      this.totalRequestsCount = reqs.length;
      this.pendingApprovalCount = reqs.filter(r => r.status === 'Pending Manager Approval').length;
      this.issuedCount = reqs.filter(r => r.status === 'Issued' || r.status === 'Manager Approved').length;
      this.rejectedCount = reqs.filter(r => r.status === 'Rejected').length;
    });
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Manager Approved':
      case 'Issued':
        return 'bg-green-100 text-green-800';
      case 'Pending Manager Approval':
        return 'bg-orange-100 text-orange-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }
}
