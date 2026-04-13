import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Producto } from '../models/producto.model';

@Injectable({ providedIn: 'root' })
export class ProductoService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/productos';
  private uploadsUrl = 'http://localhost:3000/uploads';

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
      }))
    );
  }

  agregarProducto(data: FormData) {
    return this.http.post(this.apiUrl, data);
  }
}
