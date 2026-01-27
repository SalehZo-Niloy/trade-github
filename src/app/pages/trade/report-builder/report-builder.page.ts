import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UiButtonComponent } from '../../../components/ui/ui-button.component';
import { TradeLayoutComponent } from '../../../styles/layout/trade-layout.component';

@Component({
  selector: 'app-report-builder-page',
  standalone: true,
  imports: [CommonModule, FormsModule, TradeLayoutComponent, UiButtonComponent],
  templateUrl: './report-builder.page.html',
})
export class ReportBuilderPageComponent {
  query = `SELECT
    [System.Id],
    [System.WorkItemType],
    [System.Title],              -- LC Reference (e.g., LC-2024-001)
    [System.CreatedDate],        -- LC Date
    [System.State],              -- Status (Initiated, Pending Validation, etc.)
    [System.AssignedTo],         -- Assigned To
    [System.AreaPath],
    [System.IterationPath],
    [Custom.CustomerName],       -- Customer
    [Custom.LCType],             -- Sight / Usance
    [Custom.LCAmount],           -- Amount
    [Custom.Beneficiary]         -- Beneficiary
FROM workitems
WHERE
    [System.TeamProject] = @project
    AND [System.WorkItemType] = 'Letter of Credit'
    AND [System.State] <> 'Closed'
ORDER BY
    [System.CreatedDate] DESC
`;

  previewText = '';
  showExportOptions = false;

  runQuery(): void {
    this.previewText = `Query Executed:
SELECT LCReference, LCDate, CustomerName, LCType, Amount,
       Beneficiary, Status, AssignedTo
FROM LetterOfCredit
ORDER BY LCDate DESC

Run Time   : 2026-01-27 11:05:18 (UTC)
------------------------------------------------------------

---------------------------------------------------------------------------------------------------------------
LC REFERENCE   DATE         CUSTOMER                    TYPE     AMOUNT        BENEFICIARY              STATUS                   ASSIGNED TO
---------------------------------------------------------------------------------------------------------------
LC-2024-001    2024-01-12   ABC Trading Ltd             Sight    $150,000      XYZ Exports Inc          Pending Validation      John Smith
LC-2024-002    2024-01-11   Global Industries           Usance   €85,000       European Suppliers       Forwarded to Trade      Sarah Johnson
LC-2024-003    2024-01-10   Tech Solutions Corp         Sight    $75,500       Asia Manufacturing       Initiated               Mike Chen
LC-2024-004    2024-01-09   Retail Chain Ltd            Usance   £120,000      UK Distributors          Pending Validation      Emma Davis
LC-2024-005    2024-01-15   Horizon Textiles Ltd        Sight    $220,000      Pacific Garments Co.     Pending Validation      Daniel Wright
LC-2024-006    2024-01-14   Nova Pharmaceuticals        Usance   €140,500      EuroMed Supplies GmbH    Forwarded to Trade      Alicia Brown
LC-2024-007    2024-01-13   GreenField Agro Corp        Sight    $98,750       Asia Agro Exports        Initiated               Kevin Liu
LC-2024-008    2024-01-12   Metro Electronics Ltd       Usance   £310,000      UK Components PLC        Pending Validation      Olivia Turner
LC-2024-009    2024-01-11   BlueWave Shipping Co.       Sight    $450,000      Nordic Marine Systems    Forwarded to Trade      Michael Anderson
LC-2024-010    2024-01-10   Sunrise Construction Ltd    Usance   €275,000      BuildTech Europe SA      Initiated               Sophia Martinez
---------------------------------------------------------------------------------------------------------------




------------------------------------------------------------
Total Records Returned : 10`;
  }

  toggleExportOptions(): void {
    this.showExportOptions = !this.showExportOptions;
  }

  formatQuery(): void {
    this.query = this.query.trim();
  }
}

