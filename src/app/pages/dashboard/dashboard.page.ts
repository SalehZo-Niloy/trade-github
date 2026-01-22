import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UiTableComponent } from '../../components/ui/ui-table.component';
import { CommonFooterComponent } from '../../components/common/common-footer.component';
import { UserMenuComponent } from '../../components/common/user-menu.component';
import { tradeTheme } from '../../styles/theme';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [CommonModule, UiTableComponent, CommonFooterComponent, UserMenuComponent],
  templateUrl: './dashboard.page.html',
})
export class DashboardPageComponent {
  theme = tradeTheme;

  users = [
    {
      name: 'Rahim Uddin',
      email: 'rahim.uddin@example.com',
      role: 'User',
      status: 'Active',
    },
    {
      name: 'Fatema Begum',
      email: 'fatema.begum@example.com',
      role: 'Admin',
      status: 'Active',
    },
    {
      name: 'Sajib Ahmed',
      email: 'sajib.ahmed@example.com',
      role: 'User',
      status: 'Invited',
    },
    {
      name: 'Nusrat Jahan',
      email: 'nusrat.jahan@example.com',
      role: 'User',
      status: 'Suspended',
    },
  ];

  constructor(private router: Router) {}

  goToSolution(solution: string): void {
    if (solution === 'trade-finance') {
      this.router.navigate(['/trade/dashboard']);
      return;
    }

    if (solution === 'trade-finance-customer') {
      if (typeof window !== 'undefined') {
        window.open('https://tradefinanceconfig.netlify.app/', '_blank');
      }
      return;
    }

    if (solution === 'work-flow') {
      this.router.navigate(['/workflow/work-flow']);
      return;
    }

    if (solution === 'corporate-internet-banking') {
      this.router.navigate(['/trade/dashboard']);
      return;
    }

    if (solution === 'ums') {
      this.router.navigate(['/ums/users']);
      return;
    }
  }
}
