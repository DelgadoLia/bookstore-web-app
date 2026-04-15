import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductoService } from '../../core/services/producto';
import { CarritoService } from '../../core/services/carrito';
import { Producto } from '../../core/models/producto.model';
import {ProductoCard} from '../../compartido/producto-card/producto-card';

@Component({
  selector: 'app-catalogo',
  imports: [CommonModule, ProductoCard],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.scss',
})
export class Catalogo implements OnInit {
  private productoService = inject(ProductoService);
  private carritoService = inject(CarritoService);
  private cdr = inject(ChangeDetectorRef);

  productos: Producto[] = [];
  productosFiltrados: Producto[] = [];
  generos: string[] = [];
  generoSeleccionado: string = 'Todos';
  agregadoId: number | null = null;
  cargando = false;
  error = false;

  ngOnInit() {
    this.productoService.getProductos().subscribe({
      next: (data) => {
        this.productos = data;
        this.productosFiltrados = data;
        this.generos = ['Todos', ...new Set(data.map(p => p.categoria))];
        this.cargando = false;
        this.cdr.detectChanges(); // ← esto fuerza la actualización de la UI
      },
      error: (err) => {
        console.error('Error:', err);
        this.error = true;
        this.cargando = false;
        this.cdr.detectChanges();
      }
    });
  }

  filtrarPorGenero(genero: string) {
    this.generoSeleccionado = genero;
    this.productosFiltrados = genero === 'Todos'
      ? this.productos
      : this.productos.filter(p => p.categoria === genero);
    this.cdr.detectChanges();
  }

  agregarAlCarrito(producto: Producto) {
    this.carritoService.agregar(producto);
    this.agregadoId = producto.id;
    setTimeout(() => this.agregadoId = null, 2000);
  }
}