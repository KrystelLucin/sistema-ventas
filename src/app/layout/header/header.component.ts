import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class HeaderComponent {
  @Output() toggleSidebar = new EventEmitter<void>();

  usuario: string = '';

  constructor(private router: Router) {
    const rol = localStorage.getItem('rol');
    this.usuario = rol ? rol : 'Invitado';
  }

  logout() {
    localStorage.removeItem('rol');
    this.router.navigate(['/']);
  }

  toggleMenu() {
    this.toggleSidebar.emit();
  }
}