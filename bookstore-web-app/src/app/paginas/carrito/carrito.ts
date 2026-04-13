import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CarritoService } from '../../core/services/carrito';

@Component({
  selector: 'app-carrito',
  imports: [RouterLink, CommonModule],
  templateUrl: './carrito.html',
  styleUrl: './carrito.scss',
})
export class Carrito {
  carritoService = inject(CarritoService);
}
