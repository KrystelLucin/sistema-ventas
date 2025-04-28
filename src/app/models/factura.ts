import { Cliente } from './cliente';
import { DetalleFactura } from './detalle-factura';

export interface Factura {
  idFactura: number;
  establecimiento: string;
  puntoEmision: string;
  numeroFactura: string;
  fecha: Date;
  cliente: Cliente;
  detalles: DetalleFactura[];
  subtotal: number;
  totalIVA: number;
  total: number;
}