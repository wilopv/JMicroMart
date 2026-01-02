import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer class="border-t border-subtle surface-strong py-12 text-on-dark">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 gap-8 md:grid-cols-4">
          <!-- Brand -->
          <div>
            <div class="flex items-center gap-2 mb-4">
              <div class="brand-mark flex h-10 w-10 items-center justify-center rounded-lg">
                <svg class="h-6 w-6 text-inverse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <span class="text-lg font-bold text-inverse">JMicroMart</span>
            </div>
            <p class="text-sm text-faint">Productos premium entregados en tu puerta.</p>
          </div>

          <!-- Tienda -->
          <div>
            <h3 class="mb-4 font-semibold text-inverse">Tienda</h3>
            <ul class="space-y-2 text-sm">
              <li><a routerLink="/products" class="footer-link">Todos los productos</a></li>
              <li><a href="#" class="footer-link">Más Vendidos</a></li>
              <li><a href="#" class="footer-link">En Oferta</a></li>
            </ul>
          </div>

          <!-- Empresa -->
          <div>
            <h3 class="mb-4 font-semibold text-inverse">Empresa</h3>
            <ul class="space-y-2 text-sm">
              <li><a href="#" class="footer-link">Acerca de nosotros</a></li>
              <li><a href="#" class="footer-link">Contacto</a></li>
              <li><a href="#" class="footer-link">Blog</a></li>
            </ul>
          </div>

          <!-- Legal -->
          <div>
            <h3 class="mb-4 font-semibold text-inverse">Legal</h3>
            <ul class="space-y-2 text-sm">
              <li><a href="#" class="footer-link">Política de Privacidad</a></li>
              <li><a href="#" class="footer-link">Términos de Servicio</a></li>
            </ul>
          </div>
        </div>

        <div class="border-t border-strong mt-8 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p class="text-sm text-faint">&copy; 2025 JMicroMart. Todos los derechos reservados.</p>
          <div class="flex gap-4 mt-4 md:mt-0">
            <a href="#" class="footer-link">
              <span class="sr-only">Twitter</span>
              <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20"><path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-7.241 3.746 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" /></svg>
            </a>
            <a href="#" class="footer-link">
              <span class="sr-only">Facebook</span>
              <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M20 10a10 10 0 11-20 0 10 10 0 0120 0zm-4.5-6.5h-1.5A2.5 2.5 0 0011.5 6.5v1.5h-1.5V11h1.5v6.5h2.5V11h1.5V8h-1.5V6.75c0-.344.281-.75.75-.75h.75V5z" clip-rule="evenodd" /></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [],
})
export class FooterComponent {}
