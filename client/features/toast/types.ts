export interface Toast {
  variant: 'default' | 'danger';
  message: string;
  autoDismiss?: number;
}

export interface UniqueToast extends Toast {
  id: number;
}
