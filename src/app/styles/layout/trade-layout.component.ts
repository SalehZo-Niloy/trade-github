import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonFooterComponent } from '../../components/common/common-footer.component';
import { UserMenuComponent } from '../../components/common/user-menu.component';
import { tradeTheme } from '../theme';

interface TradeMenuChild {
  label: string;
  route?: any[];
  children?: TradeMenuChild[];
}

interface TradeMenuItem {
  label: string;
  route?: any[];
  children?: TradeMenuChild[];
}

@Component({
  selector: 'app-trade-layout',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, CommonFooterComponent, UserMenuComponent],
  template: `
    <div class="flex h-screen flex-col text-slate-900" [ngClass]="theme.page.background">
      <div class="flex flex-1 overflow-hidden">
        <aside
          class="flex flex-col border-r overflow-y-auto transition-all duration-300 ease-in-out"
          [ngClass]="[theme.border.default, theme.surface.card]"
          [class.w-64]="!sidebarCollapsed"
          [class.w-0]="sidebarCollapsed"
        >
          <div class="flex items-center gap-3 border-b px-4 py-3" [ngClass]="theme.border.default">
            <img src="era_logo.svg" alt="ERA InfoTech Limited" class="h-8 w-auto" />
            <div class="flex flex-col">
              <span class="text-sm font-semibold">{{ organisationName }}</span>
            </div>
          </div>

          <nav class="flex-1 space-y-6 px-3 py-4 text-sm">
            <div>
              <div class="px-2 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                {{ primarySectionLabel }}
              </div>
              <div class="mt-2 space-y-1">
                <ng-container *ngFor="let item of mainMenuItems">
                  <ng-container *ngIf="!item.children || item.children.length === 0">
                    <a
                      [routerLink]="item.route"
                      routerLinkActive="bg-blue-50 text-blue-700 border-blue-300"
                      class="flex items-center justify-between rounded-md border border-transparent px-3 py-2 text-slate-700 hover:border-slate-200 hover:bg-slate-50"
                    >
                      <span>{{ item.label }}</span>
                    </a>
                  </ng-container>
                  <ng-container *ngIf="item.children && item.children.length > 0">
                    <button
                      type="button"
                      class="flex w-full items-center justify-between rounded-md border border-transparent px-3 py-2 text-left text-slate-700 hover:border-slate-200 hover:bg-slate-50"
                      (click)="toggleGroup(item.label)"
                    >
                      <span class="text-xs font-semibold uppercase tracking-wide">
                        {{ item.label }}
                      </span>
                      <span class="text-[10px] text-slate-400">
                        {{ isGroupExpanded(item.label) ? '▴' : '▾' }}
                      </span>
                    </button>
                    <div *ngIf="isGroupExpanded(item.label)" class="space-y-1 pl-2">
                      <ng-container *ngFor="let child of item.children">
                        <ng-container
                          *ngIf="!child.children || child.children.length === 0; else childGroup"
                        >
                          <a
                            [routerLink]="child.route"
                            routerLinkActive="bg-blue-50 text-blue-700 border-blue-300 border-blue-300"
                            class="flex items-center rounded-lg border border-transparent px-3 py-1.5 text-sm text-slate-700 hover:border-blue-200 hover:bg-blue-50"
                          >
                            <span>{{ child.label }}</span>
                          </a>
                        </ng-container>
                        <ng-template #childGroup>
                          <button
                            type="button"
                            class="flex w-full items-center justify-between rounded-md border border-transparent px-3 py-1.5 text-left text-slate-700 hover:border-slate-200 hover:bg-slate-50"
                            (click)="toggleGroup(child.label)"
                          >
                            <span class="text-[11px] font-semibold uppercase tracking-wide">
                              {{ child.label }}
                            </span>
                            <span class="text-[10px] text-slate-400">
                              {{ isGroupExpanded(child.label) ? '▴' : '▾' }}
                            </span>
                          </button>
                          <div *ngIf="isGroupExpanded(child.label)" class="space-y-1 pl-2">
                            <a
                              *ngFor="let grand of child.children"
                              [routerLink]="grand.route"
                              routerLinkActive="bg-blue-50 text-blue-700 border-blue-300 border-blue-300"
                              class="flex items-center rounded-lg border border-transparent px-3 py-1.5 text-sm text-slate-700 hover:border-blue-200 hover:bg-blue-50"
                            >
                              <span>{{ grand.label }}</span>
                            </a>
                          </div>
                        </ng-template>
                      </ng-container>
                    </div>
                  </ng-container>
                </ng-container>
              </div>
            </div>

            <!-- <div>
              <div class="px-2 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                Other Solutions
              </div>
              <div class="mt-2 space-y-1">
                <button
                  type="button"
                  class="flex w-full items-center justify-between rounded-md border border-dashed border-slate-200 px-3 py-2 text-left text-slate-400"
                >
                  <span>Corporate Internet Banking</span>
                  <span class="text-[10px] uppercase tracking-wide">Soon</span>
                </button>
              </div>
            </div> -->
          </nav>
        </aside>

        <section class="flex flex-1 flex-col">
          <header
            class="flex items-center justify-between border-b px-6 py-3"
            [ngClass]="[theme.border.default, theme.surface.card]"
          >
            <div class="flex items-center gap-3">
              <button
                type="button"
                class="flex h-8 w-8 items-center justify-center rounded-md border text-sm text-slate-700 shadow-sm hover:bg-slate-50"
                [ngClass]="[theme.border.default, theme.surface.card]"
                (click)="toggleSidebar()"
              >
                ☰
              </button>
              <div class="flex items-center gap-2 text-xs text-slate-500">
                <span>/</span>
                <span class="font-medium text-slate-700">
                  {{ breadcrumb }}
                </span>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <button
                type="button"
                class="inline-flex items-center gap-1 rounded-md border px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-50"
                [ngClass]="[theme.border.default, theme.surface.card]"
                (click)="goBack()"
              >
                <span>←</span>
                <span>Back to main dashboard</span>
              </button>
              <app-user-menu></app-user-menu>
            </div>
          </header>

          <main class="flex-1 overflow-y-auto px-6 py-6">
            <ng-content></ng-content>
          </main>
        </section>
      </div>

      <app-common-footer></app-common-footer>
    </div>
  `,
})
export class TradeLayoutComponent implements OnInit {
  @Input() organisationName = 'Trade Finance';
  @Input() solutionName = 'Trade Finance';
  @Input() breadcrumb = 'Dashboard';
  @Input() basePath = '/trade';
  @Input() primarySectionLabel = 'Trade';

  @Input() mainMenuItems: TradeMenuItem[] = [
    {
      label: 'Dashboard',
      route: ['/trade', 'dashboard'],
    },
    {
      label: 'Guarantee',
      children: [
        {
          label: 'Guarantee Application',
          route: ['/trade', 'guarantee'],
        },
        {
          label: 'Guarantee Officer Dashboard',
          route: ['/trade', 'guarantee-officer-dashboard']
        },
        {
          label: 'Guarantee Checker Dashboard',
          route: ['/trade', 'guarantee-officer-checker-dashboard']
        },
      ],
    },
    {
      label: 'Import',
      children: [
        {
          label: 'Import Application',
          children: [
            {
              label: 'Submitting Import LC Request',
              route: ['/trade', 'import', 'submitting'],
            },
            {
              label: 'Import LC Request Customer view page',
              route: ['/trade', 'import', 'customer-view'],
            },
            {
              label: 'Document view & Handover',
              route: ['/trade', 'import', 'document-handover'],
            },
            {
              label: 'Pending review & Approve Import LC',
              route: ['/trade', 'import', 'pending-review'],
            },
            {
              label: 'LC Issuance',
              route: ['/trade', 'import', 'lc-issuance'],
            },
            {
              label: 'LC Charge Collection',
              route: ['/trade', 'import', 'lc-charge-collection'],
            },
            {
              label: 'LC Margin Collection',
              route: ['/trade', 'import', 'lc-margin-collection'],
            },
            {
              label: 'LC Amendment Request',
              route: ['/trade', 'import', 'lc-amendment-request'],
            },
            {
              label: 'Document Receive',
              route: ['/trade', 'import', 'document-receive'],
            },
            {
              label: 'Document Checking',
              route: ['/trade', 'import', 'document-checking'],
            },
            {
              label: 'Discrepancy Record, Review & Rejection',
              route: ['/trade', 'import', 'discrepancy-record'],
            },
            {
              label: 'LC Settlement Decision',
              route: ['/trade', 'import', 'lc-settlement-decision'],
            },
            {
              label: 'PAD Creation',
              route: ['/trade', 'import', 'pad-creation'],
            },
            {
              label: 'Execute Payment',
              route: ['/trade', 'import', 'execute-payment'],
            },
            {
              label: 'LC Closure',
              route: ['/trade', 'import', 'lc-closure'],
            },
          ],
        },
      ],
    },
    {
      label: 'Export',
      children: [
        {
          label: 'DC Advising',
          children: [
            {
              label: 'Customer Export LC Request',
              route: ['/trade', 'dc-advising', 'customer', 'dashboard']
            },
            {
              label: 'Relationship Officer Review',
              route: ['/trade', 'dc-advising', 'ro', 'dashboard']
            },
            {
              label: 'Trade Officer Review',
              route: ['/trade', 'dc-advising', 'to', 'dashboard']
            },
            {
              label: 'Trade Approval Review',
              route: ['/trade', 'dc-advising', 'approver', 'dashboard']
            }
          ]
        },
        {
          label: 'Export-Bill Collection',
          children: [
            {
              label: 'Customer Bill Request',
              route: ['/trade', 'export-bill', 'customer', 'dashboard']
            },
            {
              label: 'Relationship Officer Review',
              route: ['/trade', 'export-bill', 'ro', 'dashboard']
            },
            {
              label: 'Trade Officer Review',
              route: ['/trade', 'export-bill', 'to', 'dashboard']
            },
            {
              label: 'Approver Review',
              route: ['/trade', 'export-bill', 'approver', 'dashboard']
            }
          ]
        },
        {
          label: 'Export Proceed',
          children: [
            {
              label: 'Trade Officer Review',
              route: ['/trade', 'export-proceed', 'to', 'dashboard']
            },
            {
              label: 'Approver Review',
              route: ['/trade', 'export-proceed', 'approver', 'dashboard']
            },
            {
              label: 'Customer Dashboard',
              route: ['/trade', 'export-proceed', 'customer', 'dashboard']
            }
          ]
        },
        {
          label: 'Master LC',
          children: [
            {
              label: 'Create Master LC',
              route: ['/trade', 'master-lc', 'customer', 'dashboard']
            },
            {
              label: 'Trade Officer Review',
              route: ['/trade', 'master-lc', 'to', 'dashboard']
            },
            {
              label: 'Manager Review',
              route: ['/trade', 'master-lc', 'manager', 'dashboard']
            },
          ]
        }
      ]
    }
  ];

  sidebarCollapsed = false;
  private expandedGroups: Record<string, boolean> = {};

  theme = tradeTheme;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const currentUrl = this.router.url;

    this.mainMenuItems.forEach((item) => {
      if (item.children) {
        const hasActiveChild = item.children.some((child) => {
          // Check Level 2 Direct Route
          if (child.route) {
            const tree = this.router.createUrlTree(child.route);
            const path = this.router.serializeUrl(tree);
            if (currentUrl.startsWith(path)) {
              return true;
            }
          }

          // Check Level 3 Children
          if (child.children && child.children.length > 0) {
            const hasActiveGrand = child.children.some((grand) => {
              if (grand.route) {
                const tree = this.router.createUrlTree(grand.route);
                const path = this.router.serializeUrl(tree);
                return currentUrl.startsWith(path);
              }
              return false;
            });

            if (hasActiveGrand) {
              this.expandedGroups[child.label] = true;
              return true;
            }
          }

          return false;
        });

        if (hasActiveChild) {
          this.expandedGroups[item.label] = true;
        }
      }
    });
  }

  toggleSidebar(): void {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }

  isGroupExpanded(label: string): boolean {
    return !!this.expandedGroups[label];
  }

  toggleGroup(label: string): void {
    this.expandedGroups[label] = !this.expandedGroups[label];
  }
}
