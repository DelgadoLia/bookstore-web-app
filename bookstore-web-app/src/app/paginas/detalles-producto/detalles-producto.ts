import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductoService } from '../../core/services/producto';
import { CarritoService } from '../../core/services/carrito';
import { Producto } from '../../core/models/producto.model';

@Component({
  selector: 'app-detalles-producto',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalles-producto.html',
  styleUrl: './detalles-producto.scss'
})
export class DetallesProducto implements OnInit {
  private route = inject(ActivatedRoute);
  private productoService = inject(ProductoService);
  private carritoService = inject(CarritoService);

  producto: Producto | undefined;
  agregado = false;

  ngOnInit() {
  const nav = history.state;

  if (nav.producto) {
    this.producto = nav.producto;
  } else {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productoService.getProductoById(id).subscribe({
      next: (data) => this.producto = data,
      error: () => this.producto = undefined
    });
  }
}

  agregarAlCarrito() {
    if (this.producto) {
      this.carritoService.agregar(this.producto);
      this.agregado = true;
      setTimeout(() => this.agregado = false, 2000);
    }
  }

  
}