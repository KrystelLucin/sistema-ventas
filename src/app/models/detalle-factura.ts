import { Producto } from './producto';

export interface DetalleFactura {
  idDetalle: number;
  producto: Producto;
  cantidad: number;
  unidadMedida: string;
  precio: number;
  iva: number;
  subtotal: number;
}