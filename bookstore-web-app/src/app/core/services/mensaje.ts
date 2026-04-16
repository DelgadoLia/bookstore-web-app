import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Mensaje } from '../models/mensaje.model';

@Injectable({ providedIn: 'root' })
export class MensajeService {
  private http = inject(HttpClient);
  private apiUrl = 'https://backend-bookstore-yzkx.onrender.com/api/mensajes';

  private cache: Mensaje[] = [];

  getMensajes(): Observable<Mensaje[]> {
    if (this.cache.length > 0) {
      return of(this.cache);
    }
    return this.http.get<Mensaje[]>(this.apiUrl).pipe(
      tap(mensajes => this.cache = mensajes)
    );
  }

  enviarMensaje(mensaje: any): Observable<any> {
    return this.http.post(this.apiUrl, mensaje);
  }
}