import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent:()=> import('./paginas/home/home').then(m=>m.Home)
    },
    {
        path: 'detalles/:id',
        loadComponent:()=> import('./paginas/detalles-producto/detalles-producto').then(m=>m.DetallesProducto)
    },
    {
        path: 'catalogo',
        loadComponent:()=> import('./paginas/catalogo/catalogo').then(m=>m.Catalogo)
    },
    {
        path: 'agregar',
        loadComponent:()=> import('./paginas/agregar/agregar').then(m=>m.Agregar)
    },
    {
        path: 'contacto',
        loadComponent:()=> import('./paginas/contacto/contacto').then(m=>m.Contacto)
    },
    {
        path: 'carrito',
        loadComponent:()=> import('./paginas/carrito/carrito').then(m=>m.Carrito)
    },
    {path:'**', redirectTo:''}
];
