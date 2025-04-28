import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Producto } from '../../../models/producto';

@Component({
  selector: 'app-producto-modal',
  standalone: true,
  templateUrl: './producto-modal.component.html',
  styleUrls: ['./producto-modal.component.css'],
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