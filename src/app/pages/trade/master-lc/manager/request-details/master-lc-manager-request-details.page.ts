import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { TradeLayoutComponent } from '../../../../../styles/layout/trade-layout.component';
import { MasterLCService, MasterLCRequest } from '../../../../../services/master-lc.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-master-lc-manager-request-details',
  standalone: true,
  imports: [CommonModule, TradeLayoutComponent, FormsModule],
  templateUrl: './master-lc-manager-request-details.page.html'
})
export class MasterLCManagerRequestDetailsPageComponent implements OnInit {
  request: MasterLCRequest | undefined;
  isLoading = true;
  remarks: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private masterLCService: MasterLCService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.loadRequest(id);
      }
    });
  }

  loadRequest(id: string) {
    this.request = this.masterLCService.getRequestById(id);
    this.isLoading = false;
  }

  approve() {
    if (this.request) {
      this.masterLCService.updateStatus(
        this.request.id, 
        'Manager Approved', 
        'Manager', 
        this.remarks || 'Approved by Manager'
      );
      this.router.navigate(['/trade/master-lc/manager/dashboard']);
    }
  }

  reject() {
    if (this.request) {
      this.masterLCService.updateStatus(
        this.request.id, 
        'Rejected', 
        'Manager', 
        this.remarks || 'Rejected by Manager'
      );
      this.router.navigate(['/trade/master-lc/manager/dashboard']);
    }
  }

  returnToTO() {
      if (this.request) {
        this.masterLCService.updateStatus(
            this.request.id,
            'Returned', // Or 'Returned to TO' if we want to be specific
            'Manager',
            this.remarks || 'Returned to Trade Officer'
        );
        this.router.navigate(['/trade/master-lc/manager/dashboard']);
      }
  }
}
