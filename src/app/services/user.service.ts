import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usuarios: User[] = [
    { idUser: 1, username: 'admin', password: '1234', role: 'admin' },
    { idUser: 2, username: 'supervisor', password: '1234', role: 'supervisor' },
    { idUser: 3, username: 'vendedor', password: '1234', role: 'vendedor' }
  ];

  constructor() {}

  login(username: string, password: string): User | undefined {
    return this.usuarios.find(u => u.username === username && u.password === password);
  }

  getUserRole(username: string): string | null {
    const usuario = this.usuarios.find(u => u.username === username);
    return usuario ? usuario.role : null;
  }

  getAllUsuarios(): User[] {
    return this.usuarios;
  }

  createUsuario(usuario: User): void {
    const idUser = this.usuarios.length + 1;
    this.usuarios.push({ ...usuario, idUser });
  }

  updateUsuario(usuario: User): void {
    const index = this.usuarios.findIndex(u => u.idUser === usuario.idUser);
    if (index !== -1) {
      this.usuarios[index] = usuario;
    }
  }

  deleteUsuario(id: number): void {
    this.usuarios = this.usuarios.filter(u => u.idUser !== id);
  }
}