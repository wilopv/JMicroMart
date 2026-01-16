import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SnackbarService } from '../services/snackbar.service';

@Component({
  selector: 'app-snackbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      *ngIf="snackbar.visible() && snackbar.message()"
      role="alert"
      [ngClass]="containerClass"
    >
      <div class="mt-0.5">
        <svg class="h-5 w-5" [ngClass]="iconClass" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path [attr.d]="iconPath" fill-rule="evenodd" clip-rule="evenodd" />
        </svg>
      </div>
      <div class="flex-1">
        {{ snackbar.message() }}
      </div>
      <button
        type="button"
        (click)="snackbar.dismiss()"
        [ngClass]="buttonClass"
        aria-label="Cerrar"
      >
        <span class="text-lg leading-none">&times;</span>
      </button>
    </div>
  `,
})
export class SnackbarComponent {
  constructor(public snackbar: SnackbarService) {}

  get containerClass(): string {
    if (this.snackbar.variant() === 'success') {
      return 'fixed left-1/2 top-20 z-50 flex w-[min(90vw,22rem)] -translate-x-1/2 items-start gap-3 rounded-lg border border-emerald-300 bg-emerald-50 px-4 py-3 text-sm text-emerald-800 shadow-md';
    }
    return 'fixed left-1/2 top-20 z-50 flex w-[min(90vw,22rem)] -translate-x-1/2 items-start gap-3 rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800 shadow-md';
  }

  get iconClass(): string {
    return this.snackbar.variant() === 'success' ? 'text-emerald-600' : 'text-red-600';
  }

  get buttonClass(): string {
    return this.snackbar.variant() === 'success'
      ? 'text-emerald-700 hover:text-emerald-900'
      : 'text-red-700 hover:text-red-900';
  }

  get iconPath(): string {
    if (this.snackbar.variant() === 'success') {
      return 'M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z';
    }
    return 'M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-4a1 1 0 00-.993.883L9 7v4a1 1 0 001.993.117L11 11V7a1 1 0 00-1-1zm0 8a1.25 1.25 0 100-2.5 1.25 1.25 0 000 2.5z';
  }
}
