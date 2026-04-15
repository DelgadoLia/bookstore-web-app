import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductoService } from '../../core/services/producto';
import { CarritoService } from '../../core/services/carrito';
import { Producto } from '../../core/models/producto.model';
import {ProductoCard} from '../../compartido/producto-card/producto-card';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule, ProductoCard],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit {
  private productoService = inject(ProductoService);
  private carritoService = inject(CarritoService);
  private cdr = inject(ChangeDetectorRef); // ← agrega esto

  productos: Producto[] = [];
  destacados: Producto[] = [];
  agregadoId: number | null = null;
  heroProducto: Producto | null = null;
  ngOnInit() {
    this.productoService.getProductos().subscribe({
    next: (data) => {
      this.productos = data;
      this.destacados = data.slice(0, 4);
      const randomIndex = Math.floor(Math.random() * data.length);
      this.heroProducto = data[randomIndex];
      this.cdr.detectChanges();
    },
      error: (err) => console.error('Error al cargar productos:', err)
    });
  }



  agregarAlCarrito(producto: Producto) {
    this.carritoService.agregar(producto);
    this.agregadoId = producto.id;
    setTimeout(() => this.agregadoId = null, 2000);
  }
}
