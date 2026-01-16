import { Injectable, signal } from '@angular/core';

type SnackbarVariant = 'success' | 'error';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  private messageState = signal<string>('');
  private visibleState = signal(false);
  private variantState = signal<SnackbarVariant>('success');
  private autoDismissMsState = signal(0);
  private timeoutId?: ReturnType<typeof setTimeout>;

  message = this.messageState.asReadonly();
  visible = this.visibleState.asReadonly();
  variant = this.variantState.asReadonly();
  autoDismissMs = this.autoDismissMsState.asReadonly();

  showSuccess(message: string, autoDismissMs = 2000): void {
    this.show(message, 'success', autoDismissMs);
  }

  showError(message: string, autoDismissMs = 4000): void {
    this.show(message, 'error', autoDismissMs);
  }

  dismiss(): void {
    this.visibleState.set(false);
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = undefined;
    }
  }

  private show(message: string, variant: SnackbarVariant, autoDismissMs: number): void {
    this.messageState.set(message);
    this.variantState.set(variant);
    this.visibleState.set(true);
    this.autoDismissMsState.set(autoDismissMs);

    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = undefined;
    }

    if (autoDismissMs > 0) {
      this.timeoutId = setTimeout(() => {
        this.dismiss();
      }, autoDismissMs);
    }
  }
}
