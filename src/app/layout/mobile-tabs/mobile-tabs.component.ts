import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mobile-tabs',
  standalone: true,
  templateUrl: './mobile-tabs.component.html',
  styleUrls: ['./mobile-tabs.component.css'],
  imports: [
    CommonModule,
    RouterModule,
    MatTabsModule
  ]
})
export class MobileTabsComponent {
  menu: { label: string, path: string }[] = [];

  constructor() {
    const rol = localStorage.getItem('rol');

    if (rol === 'admin') {
      this.menu = [
        { label: 'Orden', path: '/orden' },
        { label: 'Facturas', path: '/facturas' },
        { label: 'Productos', path: '/admin-productos' },
        { label: 'Clientes', path: '/admin-clientes' },
        { label: 'Usuarios', path: '/admin-usuarios' }
      ];
    } else if (rol === 'supervisor') {
      this.menu = [
        { label: 'Orden', path: '/orden' },
        { label: 'Facturas', path: '/facturas' },
        { label: 'Productos', path: '/admin-productos' },
        { label: 'Clientes', path: '/admin-clientes' }
      ];
    } else if (rol === 'vendedor') {
      this.menu = [
        { label: 'Orden', path: '/orden' }
      ];
    }
  }
}