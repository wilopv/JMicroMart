import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule, RouterLink],
  template: `
    <div class="flex gap-2">
      <input
        type="text"
        [(ngModel)]="searchTerm"
        (keyup.enter)="onSearch()"
        [placeholder]="placeholder"
        class="input flex-1 py-3 focus:ring-opacity-50"
      />
      <button
        (click)="onSearch()"
        [routerLink]="searchTerm ? ['/products'] : null"
        [queryParams]="searchTerm ? { q: searchTerm } : null"
        class="btn btn-primary px-6 py-3 transition-all duration-200 hover:shadow-lg active:scale-95"
      >
        {{ buttonText }}
      </button>
    </div>
  `,
  styles: [],
})
export class SearchBarComponent {
  @Input() placeholder = 'Buscar productos...';
  @Input() buttonText = 'Buscar';
  @Output() search = new EventEmitter<string>();

  searchTerm = '';

  onSearch() {
    if (this.searchTerm.trim()) {
      this.search.emit(this.searchTerm);
    }
  }
}
