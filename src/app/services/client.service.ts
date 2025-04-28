import { Injectable } from '@angular/core';
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private clientes: Cliente[] = [
    { idCliente: 1, identificacion: '1234567890', nombre: 'Cliente A', direccion: 'Dirección A', telefono: '0999999999', correo: 'clienteA@email.com' },
    { idCliente: 2, identificacion: '0987654321', nombre: 'Cliente B', direccion: 'Dirección B', telefono: '0888888888', correo: 'clienteB@email.com' }
  ];

  constructor() {}

  getAllClientes(): Cliente[] {
    return this.clientes;
  }

  getClienteById(id: number): Cliente | undefined {
    return this.clientes.find(c => c.idCliente === id);
  }

  createCliente(cliente: Cliente): void {
    const idCliente = this.clientes.length + 1;
    this.clientes.push({ ...cliente, idCliente });
  }

  updateCliente(cliente: Cliente): void {
    const index = this.clientes.findIndex(c => c.idCliente === cliente.idCliente);
    if (index !== -1) {
      this.clientes[index] = cliente;
    }
  }

  deleteCliente(idCliente: number): void {
    this.clientes = this.clientes.filter(c => c.idCliente !== idCliente);
  }
}