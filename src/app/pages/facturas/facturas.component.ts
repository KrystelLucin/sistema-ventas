import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceService } from '../../services/invoice.service';
import { Factura } from '../../models/factura';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-facturas',
  standalone: true,
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.css'],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class FacturasComponent {
  facturas: Factura[] = [];
  facturaSeleccionada: Factura | null = null;

  constructor(private invoiceService: InvoiceService) {}

  ngOnInit() {
    this.facturas = this.invoiceService.getAllFacturas();
  }

  verDetalle(factura: Factura) {
    this.facturaSeleccionada = factura;
  }

  cerrarDetalle() {
    this.facturaSeleccionada = null;
  }
}