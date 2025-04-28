import { Injectable } from '@angular/core';
import { Factura } from '../models/factura';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private facturas: Factura[] = [];

  constructor() {}

  createFactura(factura: Factura): void {
    const idFactura = this.facturas.length + 1;
    this.facturas.push({ ...factura, idFactura });
  }

  getAllFacturas(): Factura[] {
    return this.facturas;
  }

  getFacturaById(id: number): Factura | undefined {
    return this.facturas.find(f => f.idFactura === id);
  }
}