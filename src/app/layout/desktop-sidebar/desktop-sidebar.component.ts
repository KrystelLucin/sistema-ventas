import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-desktop-sidebar',
  standalone: true,
  templateUrl: './desktop-sidebar.component.html',
  styleUrls: ['./desktop-sidebar.component.css'],
  imports: [
    CommonModule,
    RouterModule,
    MatListModule
  ]
})
export class DesktopSidebarComponent {
  menu: { label: string, path: string }[] = [];

  constructor() {
    const rol = localStorage.getItem('rol');

    if (rol === 'admin') {
      this.menu = [
        { label: 'Nueva Orden', path: '/orden' },
        { label: 'Facturas', path: '/facturas' },
        { label: 'Administrar Productos', path: '/admin-productos' },
        { label: 'Administrar Clientes', path: '/admin-clientes' },
        { label: 'Administrar Usuarios', path: '/admin-usuarios' }
      ];
    } else if (rol === 'supervisor') {
      this.menu = [
        { label: 'Nueva Orden', path: '/orden' },
        { label: 'Facturas', path: '/facturas' },
        { label: 'Administrar Productos', path: '/admin-productos' },
        { label: 'Administrar Clientes', path: '/admin-clientes' }
      ];
    } else if (rol === 'vendedor') {
      this.menu = [
        { label: 'Nueva Orden', path: '/orden' }
      ];
    }
  }
}