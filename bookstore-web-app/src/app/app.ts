import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Navbar} from './compartido/navbar/navbar';
import {Footer} from './compartido/footer/footer';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {
  protected readonly title = signal('tienda-ventas');
  titulo = 'Six Eyes Melancolicos';
}
