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

  truncateWords(text: string, limit: number = 7): string {
    if (!text) return '';
    const words = text.split(' ');
    if (words.length <= limit) {
      return text;
    }
    return words.slice(0, limit).join(' ') + '...';
  }
}


