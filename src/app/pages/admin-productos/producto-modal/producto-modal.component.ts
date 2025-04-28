import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Producto } from '../../../models/producto';

@Component({
  selector: 'app-modal-producto',
  standalone: true,
  templateUrl: './modal-producto.component.html',
  styleUrls: ['./modal-producto.component.css'],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class ModalProductoComponent {
  producto: Producto = {
    idProducto: 0,
    codigo: '',
    descripcion: '',
    categoria: '',
    precio: 0
  };

  constructor(
    public dialogRef: MatDialogRef<ModalProductoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Producto | null
  ) {
    if (data) {
      this.producto = { ...data };
    }
  }

  guardar() {
    this.dialogRef.close(this.producto);
  }

  cancelar() {
    this.dialogRef.close();
  }
}