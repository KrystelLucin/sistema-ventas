import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { InvoiceService } from '../../services/invoice.service';
import { Producto } from '../../models/producto';
import { Factura } from '../../models/factura';
import { DetalleFactura } from '../../models/detalle-factura';
import { ClientService } from '../../services/client.service';
import { Cliente } from '../../models/cliente';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-orden',
  standalone: true,
  templateUrl: './orden.component.html',
  styleUrls: ['./orden.component.css'],
  imports: [
    CommonModule,
    MatIconModule,
    FormsModule
  ]
})
export class OrdenComponent {
  clientesDisponibles: Cliente[] = [];
  clientesFiltrados: Cliente[] = [];
  clienteSeleccionado: Cliente | null = null;
  filtroCliente: string = '';

  productosDisponibles: Producto[] = [];
  filtroProducto: string = '';
  productosFiltrados: Producto[] = [];

  carrito: DetalleFactura[] = [];
  subtotal: number = 0;
  totalIVA: number = 0;
  total: number = 0;

  constructor(
    private clientService: ClientService,
    private productService: ProductService,
    private invoiceService: InvoiceService
  ) {}

  ngOnInit() {
    this.clientesDisponibles = this.clientService.getAllClientes();
    this.clientesFiltrados = [...this.clientesDisponibles];
    this.productosDisponibles = this.productService.getAllProductos();
    this.productosFiltrados = [...this.productosDisponibles];
  }

  filtrarClientes() {
    const texto = this.filtroCliente.toLowerCase();
    this.clientesFiltrados = this.clientesDisponibles.filter(c =>
      c.identificacion.toLowerCase().includes(texto) ||
      c.nombre.toLowerCase().includes(texto)
    );
  }

  seleccionarCliente(cliente: Cliente) {
    this.clienteSeleccionado = cliente;
  }

  cambiarCliente() {
    this.clienteSeleccionado = null;
  }

  filtrarProductos() {
    const texto = this.filtroProducto.toLowerCase();
    this.productosFiltrados = this.productosDisponibles.filter(p =>
      p.codigo.toLowerCase().includes(texto) ||
      p.descripcion.toLowerCase().includes(texto)
    );
  }

  agregarProducto(producto: Producto) {
    const detalleExistente = this.carrito.find(d => d.producto.idProducto === producto.idProducto);

    if (detalleExistente) {
      detalleExistente.cantidad += 1;
      detalleExistente.subtotal = detalleExistente.cantidad * detalleExistente.precio;
      detalleExistente.iva = detalleExistente.subtotal * 0.12;
    } else {
      const nuevoDetalle: DetalleFactura = {
        idDetalle: this.carrito.length + 1,
        producto: producto,
        cantidad: 1,
        unidadMedida: 'unidad',
        precio: producto.precio,
        iva: producto.precio * 0.12,
        subtotal: producto.precio
      };
      this.carrito.push(nuevoDetalle);
    }

    this.calcularTotales();
  }

  cambiarCantidad(detalle: DetalleFactura, nuevaCantidad: number) {
    if (nuevaCantidad <= 0) {
      this.carrito = this.carrito.filter(d => d.idDetalle !== detalle.idDetalle);
    } else {
      detalle.cantidad = nuevaCantidad;
      detalle.subtotal = detalle.precio * nuevaCantidad;
      detalle.iva = detalle.subtotal * 0.12;
    }

    this.calcularTotales();
  }

  eliminarProducto(detalle: DetalleFactura) {
    this.carrito = this.carrito.filter(d => d.idDetalle !== detalle.idDetalle);
    this.calcularTotales();
  }

  calcularTotales() {
    this.subtotal = this.carrito.reduce((acc, detalle) => acc + detalle.subtotal, 0);
    this.totalIVA = this.carrito.reduce((acc, detalle) => acc + detalle.iva, 0);
    this.total = this.subtotal + this.totalIVA;
  }

  confirmarOrden() {
    if (this.carrito.length === 0) {
      alert('Agrega productos antes de confirmar la orden.');
      return;
    }
    
    if (this.clienteSeleccionado===null) {
      alert('Selecciona un cliente antes de confirmar la orden.');
      return;
    }

    const nuevaFactura: Factura = {
      idFactura: 0,
      establecimiento: '001',
      puntoEmision: '001',
      numeroFactura: '000000001',
      fecha: new Date(),
      cliente: {
        idCliente: 1,
        identificacion: '1234567890',
        nombre: 'Cliente Demo',
        direccion: 'Dirección Demo',
        telefono: '0999999999',
        correo: 'cliente@demo.com'
      },
      detalles: this.carrito,
      subtotal: this.subtotal,
      totalIVA: this.totalIVA,
      total: this.total
    };

    this.invoiceService.createFactura(nuevaFactura);

    // Limpiar todo
    this.carrito = [];
    this.subtotal = 0;
    this.totalIVA = 0;
    this.total = 0;

    alert('Orden creada exitosamente!');
  }
}
