import { Routes } from '@angular/router';
import { TradeDashboardPageComponent } from '../pages/trade/dashboard/trade-dashboard.page';
import { GuaranteeApplicationPageComponent } from '../pages/trade/guarantee/guarantee-application/guarantee-application.page';
import { GuaranteeOfficerDashboardPageComponent } from '../pages/trade/guarantee/officer-dashboard/officer-dashboard.page';
import { GuaranteeApplicationReviewPageComponent } from '../pages/trade/guarantee/officer-dashboard/guarantee-application-review/guarantee-application-review.page';
import { CreateSwiftMessagePageComponent } from '../pages/trade/guarantee/officer-dashboard/create-swift-message/create-swift-message.page';

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
    path: 'guarantee-application-review',
    component: GuaranteeApplicationReviewPageComponent
  },
  {
    path: 'create-swift-message',
    component: CreateSwiftMessagePageComponent
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }
];
