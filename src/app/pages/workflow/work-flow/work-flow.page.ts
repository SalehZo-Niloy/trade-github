import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TradeLayoutComponent } from '../../../styles/layout/trade-layout.component';

@Component({
  selector: 'app-work-flow-page',
  standalone: true,
  imports: [CommonModule, TradeLayoutComponent],
  templateUrl: './work-flow.page.html',
})
export class WorkFlowPageComponent {
  menuItems = [
    {
      label: 'WorkFlow',
      route: ['/workflow', 'work-flow'],
    },
    {
      label: 'Test WorkFlow',
      route: ['/workflow', 'test-work-flow'],
    },
  ];

  workflowDefinitions = [
    {
      id: '8a16afba0c847af5',
      name: 'ListTasks',
      latestVersion: 6,
      publishedVersion: 6,
      description: '',
    },
    {
      id: '3e970eee281541c9',
      name: 'Onboarding',
      latestVersion: 2,
      publishedVersion: 1,
      description: 'A simple onboarding process for demo purposes.',
    },
    {
      id: 'c2b34fc678853ed1',
      name: 'Test101',
      latestVersion: 3,
      publishedVersion: 2,
      description: '',
    },
    {
      id: 'fb27085e78433f79',
      name: 'Triggers',
      latestVersion: 3,
      publishedVersion: 3,
      description: '',
    },
  ];
}
