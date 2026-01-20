import { Component, OnInit } from '@angular/core';
import { CommonModule, NgIf, DecimalPipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { TradeLayoutComponent } from '../../../../../styles/layout/trade-layout.component';
import { ExportBillService, ExportBill } from '../../../../../services/export-bill.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-export-bill-to-request-details',
  standalone: true,
  imports: [CommonModule, TradeLayoutComponent, NgIf, DecimalPipe],
  templateUrl: './export-bill-to-request-details.page.html'
})
export class ExportBillToRequestDetailsPageComponent implements OnInit {
  bill: ExportBill | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private billService: ExportBillService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.billService.getBill(id).subscribe(bill => {
          this.bill = bill;
        });
      }
    });
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'VERIFIED': return 'bg-indigo-100 text-indigo-800';
      case 'APPROVED': return 'bg-green-100 text-green-800';
      case 'SENT_TO_IMPORTER': return 'bg-purple-100 text-purple-800';
      case 'RETURNED': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  verifyAndForward() {
    if (!this.bill) return;

    Swal.fire({
      title: 'Verify & Forward?',
      text: "This will forward the request to the Approver.",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#0d9488', // Teal-600
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Verify & Forward'
    }).then((result) => {
      if (result.isConfirmed) {
        // Update Status
        this.bill!.status = 'APPROVED'; // Or PENDING_APPROVAL
        
        Swal.fire({
          title: 'Verification Successful!',
          text: 'Request has been forwarded to Approver.',
          icon: 'success',
          confirmButtonColor: '#0d9488'
        }).then(() => {
          this.router.navigate(['/trade/export-bill/to/dashboard']);
        });
      }
    });
  }

  returnToExporter() {
    if (!this.bill) return;

    Swal.fire({
      title: 'Return to Exporter?',
      input: 'textarea',
      inputLabel: 'Reason for return',
      inputPlaceholder: 'Type your reason here...',
      inputAttributes: {
        'aria-label': 'Type your reason here'
      },
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Return Request'
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        this.bill!.status = 'RETURNED';
        Swal.fire(
          'Returned!',
          'Request has been returned to the exporter.',
          'success'
        ).then(() => {
          this.router.navigate(['/trade/export-bill/to/dashboard']);
        });
      }
    });
  }
}
