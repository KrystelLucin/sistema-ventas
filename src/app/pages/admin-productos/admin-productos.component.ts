import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ProductService } from '../../services/product.service';
import { Producto } from '../../models/producto';
import { ModalProductoComponent } from './producto-modal/producto-modal.component';

@Component({
  selector: 'app-productos',
  standalone: true,
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class AdminProductosComponent {
  productos: Producto[] = [];

  constructor(
    private productoService: ProductService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.productos = this.productoService.getAllProductos();
  }

  nuevoProducto() {
    const dialogRef = this.dialog.open(ModalProductoComponent, {
      width: '400px',
      data: null
    });

    dialogRef.afterClosed().subscribe(resultado => {
      if (resultado) {
        this.productoService.createProducto(resultado);
        this.productos = this.productoService.getAllProductos();
      }
    });
  }

  editarProducto(producto: Producto) {
    const dialogRef = this.dialog.open(ModalProductoComponent, {
      width: '400px',
      data: producto
    });

    dialogRef.afterClosed().subscribe(resultado => {
      if (resultado) {
        this.productoService.updateProducto(resultado);
        this.productos = this.productoService.getAllProductos();
      }
    });
  }

  verDetalle(producto: Producto) {
    alert('Detalle de producto: ' + producto.descripcion);
  }
}
