import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Producto } from '../../core/models/producto.model';

@Component({
  selector: 'app-producto-card',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './producto-card.html',
  styleUrl: './producto-card.scss'
})
export class ProductoCard {
  @Input() producto!: Producto;
  @Input() agregadoId: number | null = null;
  @Output() agregar = new EventEmitter<Producto>();
}
