import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ProductoService } from '../../core/services/producto';
import { CarritoService } from '../../core/services/carrito';
import { Producto } from '../../core/models/producto.model';
import { ProductoCard } from '../../compartido/producto-card/producto-card';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule, ProductoCard],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.scss',
})
export class Catalogo implements OnInit {

  private productoService = inject(ProductoService);
  private carritoService = inject(CarritoService);
  private http = inject(HttpClient);
  private cdr = inject(ChangeDetectorRef);

  productos: Producto[] = [];
  productosFiltrados: Producto[] = [];
  generos: string[] = [];
  generoSeleccionado = 'Todos';
  agregadoId: number | null = null;
  cargando = true;
  error = false;
  cargasPendientes = 3;

  ngOnInit() {
    this.cargarProductosLocales();
    this.cargarPopulares();
    this.cargarHunter();
  }

  cargarProductosLocales() {
    this.productoService.getProductos().subscribe({
      next: (data) => {
        this.productos = [...this.productos, ...data];
        this.finalizarCarga();
      },
      error: () => {
        this.error = true;
        this.finalizarCarga();
      }
    });
  }

  cargarPopulares() {
    this.http.get<any>('https://backend-bookstore-yzkx.onrender.com/api/manga')
      .subscribe({
        next: (res) => {
          const populares = this.transformarMangas(res.data, 2000);
          this.productos = [...this.productos, ...populares];
          this.finalizarCarga();
        },
        error: () => this.finalizarCarga()
      });
  }

  cargarHunter() {
    this.http.get<any>('https://backend-bookstore-yzkx.onrender.com/api/manga?title=hunter')
      .subscribe({
        next: (res) => {
          const hunter = this.transformarMangas(res.data, 3000);
          this.productos = [...this.productos, ...hunter];
          this.finalizarCarga();
        },
        error: () => this.finalizarCarga()
      });
  }

  transformarMangas(data: any[], baseId: number): Producto[] {
    return data.map((m: any, index: number) => {
      const titulo = m.attributes.title.en || Object.values(m.attributes.title)[0];

      const cover = m.relationships.find((r: any) => r.type === 'cover_art');

      let imagen = 'https://placehold.co/300x400?text=Manga';

      if (cover) {
        imagen = `https://uploads.mangadex.org/covers/${m.id}/${cover.attributes.fileName}.256.jpg`;
      }

      return {
        id: baseId + index,
        nombre: titulo,
        categoria: 'Manga',
        editorial: 'MangaDex',
        tomo: Math.floor(Math.random() * 20) + 1,
        precio: Math.floor(Math.random() * 200) + 50,
        disponible: 1,
        imagen,
        stock: 10,
        descripcion: m.attributes.description?.en || 'Manga disponible'
      };
    });
  }

  finalizarCarga() {
    this.cargasPendientes--;
    if (this.cargasPendientes === 0) {
      this.actualizarVista();
    }
  }

  actualizarVista() {
    this.productosFiltrados = this.productos;
    this.generos = ['Todos', ...new Set(this.productos.map(p => p.categoria))];
    this.cargando = false;
    this.cdr.detectChanges();
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