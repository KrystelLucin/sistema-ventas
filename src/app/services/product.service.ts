import { Injectable } from '@angular/core';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productos: Producto[] = [
    { idProducto: 1, codigo: 'P001', descripcion: 'Producto A', categoria: 'Bebidas', precio: 2.5 },
    { idProducto: 2, codigo: 'P002', descripcion: 'Producto B', categoria: 'Comidas', precio: 5.0 },
    { idProducto: 3, codigo: 'P003', descripcion: 'Producto C', categoria: 'Postres', precio: 3.0 }
  ];

  constructor() {}

  getAllProductos(): Producto[] {
    return this.productos;
  }

  getProductoById(id: number): Producto | undefined {
    return this.productos.find(p => p.idProducto === id);
  }

  createProducto(producto: Producto): void {
    const idProducto = this.productos.length + 1;
    this.productos.push({ ...producto, idProducto });
  }

  updateProducto(producto: Producto): void {
    const index = this.productos.findIndex(p => p.idProducto === producto.idProducto);
    if (index !== -1) {
      this.productos[index] = producto;
    }
  }

  deleteProducto(idProducto: number): void {
    this.productos = this.productos.filter(p => p.idProducto !== idProducto);
  }
}