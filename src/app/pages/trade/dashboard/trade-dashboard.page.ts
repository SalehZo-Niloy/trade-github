import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TradeLayoutComponent } from '../../../styles/layout/trade-layout.component';

@Component({
  selector: 'app-trade-dashboard-page',
  standalone: true,
  imports: [CommonModule, TradeLayoutComponent],
  templateUrl: './trade-dashboard.page.html'
})
export class TradeDashboardPageComponent {}
