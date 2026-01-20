export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'ghost'
  | 'danger'
  | 'success'
  | 'warning';

export type SurfaceLevel =
  | 'page'
  | 'card'
  | 'muted'
  | 'accent';

export type BorderTone =
  | 'default'
  | 'subtle'
  | 'strong'
  | 'accent'
  | 'danger';

export type InputState =
  | 'default'
  | 'filled'
  | 'disabled'
  | 'invalid';

export type TableArea =
  | 'header'
  | 'row'
  | 'rowHover'
  | 'border';

export type StatusVariant =
  | 'neutral'
  | 'info'
  | 'success'
  | 'warning'
  | 'danger';

export interface TradeTheme {
  page: {
    background: string;
  };
  surface: Record<SurfaceLevel, string>;
  border: Record<BorderTone, string>;
  button: Record<ButtonVariant, string>;
  input: {
    background: Record<InputState, string>;
    border: Record<InputState, string>;
  };
  table: Record<TableArea, string>;
  status: Record<StatusVariant, string>;
  text: {
    primary: string;
    secondary: string;
    muted: string;
    onPrimary: string;
    onDanger: string;
    onSuccess: string;
    success: string;
    warning: string;
    danger: string;
    info: string;
  };
}

export const tradeTheme: TradeTheme = {
  page: {
    background: 'bg-slate-50'
  },
  surface: {
    page: 'bg-slate-50',
    card: 'bg-white',
    muted: 'bg-slate-50',
    accent: 'bg-blue-50'
  },
  border: {
    default: 'border-slate-200',
    subtle: 'border-slate-100',
    strong: 'border-slate-300',
    accent: 'border-blue-200',
    danger: 'border-rose-200'
  },
  button: {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    secondary: 'bg-white border border-slate-300 text-slate-800 hover:bg-slate-50',
    ghost: 'bg-transparent text-slate-700 hover:bg-slate-50',
    danger: 'bg-rose-600 hover:bg-rose-700 text-white',
    success: 'bg-emerald-600 hover:bg-emerald-700 text-white',
    warning: 'bg-amber-500 hover:bg-amber-600 text-white'
  },
  input: {
    background: {
      default: 'bg-white',
      filled: 'bg-slate-50',
      disabled: 'bg-slate-100',
      invalid: 'bg-rose-50'
    },
    border: {
      default: 'border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100',
      filled: 'border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100',
      disabled: 'border-slate-200',
      invalid: 'border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-100'
    }
  },
  table: {
    header: 'bg-slate-50',
    row: 'bg-white',
    rowHover: 'hover:bg-slate-50',
    border: 'border-slate-200'
  },
  status: {
    neutral: 'bg-slate-100 text-slate-800',
    info: 'bg-blue-50 text-blue-700',
    success: 'bg-emerald-50 text-emerald-700',
    warning: 'bg-amber-50 text-amber-800',
    danger: 'bg-rose-50 text-rose-700'
  },
  text: {
    primary: 'text-slate-900',
    secondary: 'text-slate-700',
    muted: 'text-slate-500',
    onPrimary: 'text-white',
    onDanger: 'text-white',
    onSuccess: 'text-white',
    success: 'text-emerald-700',
    warning: 'text-amber-700',
    danger: 'text-rose-700',
    info: 'text-blue-700'
  }
};
