import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Producto } from '../models/producto.model';

@Injectable({ providedIn: 'root' })
export class ProductoService {
  private http = inject(HttpClient);
  private apiUrl = 'https://backend-bookstore-yzkx.onrender.com/api/productos';
  private uploadsUrl = 'https://backend-bookstore-yzkx.onrender.com/uploads';

  private cache: Producto[] = [];

  getProductos(): Observable<Producto[]> {
    if (this.cache.length > 0) {
      return of(this.cache);
    }
    return this.http.get<Producto[]>(this.apiUrl).pipe(
      map(productos => productos.map(p => ({
        ...p,
        imagen: `${this.uploadsUrl}/${p.imagen}`
      }))),
      tap(productos => this.cache = productos)
    );
  }

  getProductoById(id: number): Observable<Producto> {
  const local = this.cache.find(p => p.id === id);

  if (local) {
    return of(local);
  }

  return this.http.get<Producto>(`${this.apiUrl}/${id}`).pipe(
    map(p => ({
      ...p,
      imagen: `${this.uploadsUrl}/${p.imagen}`
    })),
    tap(p => {
      if (!this.cache.find(x => x.id === p.id)) {
        this.cache.push(p);
      }
    })
  );
}

  agregarProducto(data: FormData) {
    return this.http.post(this.apiUrl, data);
  }
}
