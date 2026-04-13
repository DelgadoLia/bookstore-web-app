import { computed, Injectable, signal } from '@angular/core';
import {Producto} from '../models/producto.model';

export interface ItemCarrito{
  producto: Producto;
  cantidad: number;
}

@Injectable({
  providedIn: 'root',
})
export class CarritoService {
  items=signal<ItemCarrito[]>([]);
  total=computed(() =>
    this.items().reduce((acc, i)=>acc+i.producto.precio*i.cantidad,0)
  );
  cantidadTotal=computed(()=>
    this.items().reduce((acc, i)=>acc+i.cantidad,0)
  );

  agregar(producto: Producto){
    const actual = this.items();
    const existe = actual.find(i => i.producto.id === producto.id);
    if (existe) {
      this.items.set(actual.map(i =>
        i.producto.id === producto.id
          ? { ...i, cantidad: i.cantidad + 1 }
          : i
      ));
    } else {
      this.items.set([...actual, { producto, cantidad: 1 }]);
    }
  }
  quitar(id: number): void {
    this.items.set(this.items().filter(i => i.producto.id !== id));
  }

  limpiar(): void {
    this.items.set([]);
  }
}
