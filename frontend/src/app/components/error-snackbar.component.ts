import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-error-snackbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      *ngIf="message && isVisible"
      role="alert"
      class="flex items-start gap-3 rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800"
    >
      <div class="mt-0.5">
        <svg class="h-5 w-5 text-red-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path
            fill-rule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-4a1 1 0 00-.993.883L9 7v4a1 1 0 001.993.117L11 11V7a1 1 0 00-1-1zm0 8a1.25 1.25 0 100-2.5 1.25 1.25 0 000 2.5z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
      <div class="flex-1">
        {{ message }}
      </div>
      <button
        type="button"
        (click)="dismiss()"
        class="text-red-700 hover:text-red-900"
        aria-label="Cerrar"
      >
        <span class="text-lg leading-none">&times;</span>
      </button>
    </div>
  `,
})
export class ErrorSnackbarComponent implements OnChanges {
  @Input() message: string | null = null;
  @Input() autoDismissMs = 0;
  isVisible = true;
  private timeoutId?: ReturnType<typeof setTimeout>;

  // Reacts to message changes and optionally schedules auto-dismiss.
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['message']) {
      this.isVisible = true;
      this.scheduleAutoDismiss();
    }
  }

  // Hides the snackbar and clears any pending timeout.
  dismiss(): void {
    this.isVisible = false;
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = undefined;
    }
  }

  // Schedules automatic dismissal when configured.
  private scheduleAutoDismiss(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = undefined;
    }
    if (this.autoDismissMs > 0) {
      this.timeoutId = setTimeout(() => {
        this.dismiss();
      }, this.autoDismissMs);
    }
  }
}
