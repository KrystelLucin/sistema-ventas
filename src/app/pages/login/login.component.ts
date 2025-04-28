import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UserService } from '../../services/user.service'; // Importamos el service

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule
  ]
})
export class LoginComponent {
  usuario: string = '';
  password: string = '';
  error: boolean = false;

  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  login() {
    const user = this.userService.login(this.usuario, this.password);

    if (user) {
      localStorage.setItem('usuario', user.username);
      localStorage.setItem('rol', user.role);

      this.router.navigate(['/menu']);
    } else {
      this.error = true;
    }
  }
}