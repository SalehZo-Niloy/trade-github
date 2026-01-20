import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UiButtonComponent } from '../../../../../components/ui/ui-button.component';
import { TradeLayoutComponent } from '../../../../../styles/layout/trade-layout.component';

interface PartyCard {
  label: string;
  name: string;
  address: string;
  swift: string;
  account?: string;
}

interface TermField {
  label: string;
  value: string;
}

interface DocumentItem {
  name: string;
  description: string;
}

interface RuleItem {
  title: string;
  description: string;
}

@Component({
  selector: 'app-import-lc-issuance-page',
  standalone: true,
  imports: [CommonModule, TradeLayoutComponent, UiButtonComponent],
  templateUrl: './lc-issuance.page.html',
})
export class ImportLcIssuancePageComponent {
  header = {
    title: 'LC Issuance & MT700 Preparation',
    reference: 'LC-2024-00847',
    status: 'Approved',
    approvedBy: 'Sarah Johnson',
    approvedDate: 'Jan 14, 2025',
  };

  parties: PartyCard[] = [
    {
      label: 'Applicant',
      name: 'GlobalTech Industries Ltd',
      address:
        '4000th 4522-18990-2321\n45 Commerce Street, Financial District\nNew York, NY 10014, USA',
      swift: 'GTIUS33XXX',
      account: 'AC-00000029839-231',
    },
    {
      label: 'Beneficiary',
      name: 'Shanghai Electronics Co., Ltd',
      address: 'No. 88 Pudong Avenue, Pudong District\nShanghai 200120, China',
      swift: 'SHENSHNXXX',
      account: 'Bank of China, Shanghai Branch',
    },
  ];

  terms: TermField[] = [
    { label: 'LC Amount', value: '$2,450,000.00' },
    { label: 'Currency', value: 'USD' },
    { label: 'Tolerance', value: '+/-5%' },
    { label: 'Expiry Date', value: 'March 15, 2025' },
    { label: 'Latest Shipment Date', value: 'February 28, 2025' },
    { label: 'Port of Loading', value: 'Shanghai Port, China' },
    { label: 'Port of Discharge', value: 'Port of New York, USA' },
  ];

  documents: DocumentItem[] = [
    {
      name: 'Commercial Invoice',
      description: 'Original + 3 copies, signed and stamped',
    },
    {
      name: 'Bill of Lading',
      description:
        'Full set of clean on-board ocean bills of lading made out to order and blank endorsed',
    },
    {
      name: 'Packing List',
      description: 'Original + 2 copies showing detailed packing information',
    },
    {
      name: 'Certificate of Origin',
      description: 'Form A issued by Chamber of Commerce',
    },
    {
      name: 'Insurance Certificate',
      description: 'Covering 110% of invoice value for all risks including war risks',
    },
  ];

  rules: RuleItem[] = [
    {
      title: 'UCP 600 Compliance',
      description:
        'This documentary credit is subject to the Uniform Customs and Practice for Documentary Credits (2007 Revision), ICC Publication No. 600.',
    },
    {
      title: 'Irrevocable Documentary Credit',
      description: 'Transferable: No · Partial Shipments: Allowed · Transshipment: Not Allowed',
    },
  ];

  mt700 = {
    reference: 'LC-2024-00847',
    preview: `:27: 1/1
:40A: IRREVOCABLE
:20: LC-2024-00847
:31C: 240114
:40E: UCP LATEST VERSION
:31D: 250315 NEW YORK
:50: APPLICANT
GLOBALTECH INDUSTRIES LTD
45 COMMERCE STREET
NEW YORK NY 10014 USA
:59: BENEFICIARY
SHANGHAI ELECTRONICS CO LTD
NO 88 PUDONG AVENUE
SHANGHAI 200120 CHINA
:32B: USD2450000
:41A: BANK OF CHINA SHANGHAI
:42C: AT SIGHT
:43P: PARTIAL SHIPMENTS ALLOWED
:43T: TRANSSHIPMENT NOT ALLOWED
:44E: PORT OF LOADING SHANGHAI
:44F: PORT OF DISCHARGE NEW YORK
:44C: LATEST DATE OF SHIPMENT 250228
:45A: GOODS
INDUSTRIAL MACHINERY COMPONENTS
:46A: DOCUMENTS REQUIRED
COMMERCIAL INVOICE
BILL OF LADING
PACKING LIST
CERTIFICATE OF ORIGIN
INSURANCE CERTIFICATE
:47A: ADDITIONAL CONDITIONS
ALL DOCUMENTS MUST INDICATE LC NUMBER
:71B: CHARGES FOR BENEFICIARY
:49: CONFIRMATION INSTRUCTIONS
WITHOUT`,
  };

  validation = {
    status: 'Message Validated',
    note: 'Ready for transmission',
  };

  onSaveDraft() {
    // secondary button look — use slate color for draft toast
    this.showToast('Draft saved', '#475569');
  }

  onValidateLc() {
    this.showAlert('LC Validated', 'Successfully validated LC', '#f59e0b');
  }

  onSubmitForIssuance() {
    this.showAlert('Submitted', 'LC submitted for issuance', '#2563eb');
  }

  private showToast(message: string, bgColor: string = '#10b981') {
    const id = `tf-toast-${Date.now()}`;
    const el = document.createElement('div');
    el.id = id;
    // make a slightly larger, card-like toast at bottom-left with an icon
    el.innerHTML = `<div style="display:flex;align-items:center;gap:10px;"><svg width=18 height=18 viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><circle cx='12' cy='12' r='10' fill='rgba(255,255,255,0.12)'/><path d='M9.5 12.5l1.8 1.8L15 10.6' stroke='white' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'/></svg><div style="font-size:13px;color:white">${message}</div></div>`;
    Object.assign(el.style, {
      position: 'fixed',
      bottom: '18px',
      left: '18px',
      background: bgColor,
      color: 'white',
      padding: '12px 16px',
      borderRadius: '10px',
      boxShadow: '0 10px 30px rgba(2,6,23,0.2)',
      zIndex: '9999',
      fontSize: '14px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    });
    document.body.appendChild(el);
    // fade out after delay
    setTimeout(() => {
      el.style.transition = 'opacity 300ms ease, transform 300ms ease';
      el.style.opacity = '0';
      el.style.transform = 'translateY(6px)';
      setTimeout(() => el.remove(), 320);
    }, 1600);
  }

  private showAlert(title: string, text: string, accentColor: string) {
    const overlay = document.createElement('div');
    Object.assign(overlay.style, {
      position: 'fixed',
      inset: '0',
      background: 'rgba(0,0,0,0.35)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: '10000',
    });

    const box = document.createElement('div');
    Object.assign(box.style, {
      background: 'white',
      padding: '0',
      borderRadius: '12px',
      width: '380px',
      boxShadow: '0 18px 60px rgba(2,6,23,0.25)',
      textAlign: 'center',
      color: '#0f172a',
      overflow: 'hidden',
      fontFamily: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
    });

    // top accent bar
    const accent = document.createElement('div');
    Object.assign(accent.style, {
      height: '8px',
      background: accentColor,
      width: '100%',
    });

    const content = document.createElement('div');
    Object.assign(content.style, {
      padding: '20px',
    });

    const h = document.createElement('div');
    h.textContent = title;
    Object.assign(h.style, {
      fontSize: '18px',
      fontWeight: '700',
      marginBottom: '8px',
      color: '#0f172a',
    });

    const p = document.createElement('div');
    p.textContent = text;
    Object.assign(p.style, { fontSize: '13px', color: '#475569', marginBottom: '18px' });

    const btn = document.createElement('button');
    btn.textContent = 'OK';
    Object.assign(btn.style, {
      background: accentColor,
      color: 'white',
      border: 'none',
      padding: '10px 18px',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: '700',
    });
    btn.onclick = () => overlay.remove();

    content.appendChild(h);
    content.appendChild(p);
    content.appendChild(btn);

    box.appendChild(accent);
    box.appendChild(content);
    overlay.appendChild(box);
    document.body.appendChild(overlay);
  }
}
