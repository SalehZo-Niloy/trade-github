import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TradeLayoutComponent } from '../../../../../styles/layout/trade-layout.component';
import { MasterLCService, MasterLCRequest } from '../../../../../services/master-lc.service';
import { TradeRequestService } from '../../../../../services/trade-request.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-master-lc-customer-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, TradeLayoutComponent],
  templateUrl: './master-lc-customer-dashboard.page.html'
})
export class MasterLCCustomerDashboardPageComponent implements OnInit {
  recentRequests$: Observable<MasterLCRequest[]>;
  pendingDCAdvisingCount: number = 2; // Mock or calculated
  masterLCRequestsCount: number = 3;
  pendingApprovalsCount: number = 2;
  issuedMasterLCsCount: number = 0;

  constructor(
    private masterLCService: MasterLCService,
    private tradeRequestService: TradeRequestService
  ) {
    this.recentRequests$ = this.masterLCService.requests$;
  }

  ngOnInit() {
    this.masterLCService.requests$.subscribe((reqs: MasterLCRequest[]) => {
      this.masterLCRequestsCount = reqs.length;
      this.pendingApprovalsCount = reqs.filter((r: MasterLCRequest) => r.status === 'Pending Approval').length;
      this.issuedMasterLCsCount = reqs.filter((r: MasterLCRequest) => r.status === 'Issued').length;
    });
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Manager Approved':
      case 'Issued':
        return 'bg-green-100 text-green-800';
      case 'Pending Approval':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }
}
