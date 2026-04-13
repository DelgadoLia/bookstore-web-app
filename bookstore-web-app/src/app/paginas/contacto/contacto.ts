import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { MensajeService } from '../../core/services/mensaje';
import { Mensaje } from '../../core/models/mensaje.model';

@Component({
  selector: 'app-contacto',
  imports: [CommonModule, FormsModule],
  templateUrl: './contacto.html',
  styleUrl: './contacto.scss',
})
export class Contacto implements OnInit {

  constructor(private mensajeService: MensajeService) {}

  formulario = {
    nombre: '',
    correo: '',
    asunto: '',
    mensaje: ''
  };

  enviado = false;
  enviando = false;

  mensajes: Mensaje[] = [];
  mensajesAleatorios: Mensaje[] = [];

  ngOnInit() {
    const data = localStorage.getItem('mensajes');

    if (data) {
      this.mensajes = JSON.parse(data);
      this.seleccionarAleatorios();
    } else {
      this.cargarMensajes();
    }
  }

  cargarMensajes() {
    this.mensajeService.getMensajes().subscribe({
      next: (data) => {
        this.mensajes = data;
        localStorage.setItem('mensajes', JSON.stringify(this.mensajes));
        this.seleccionarAleatorios();
      },
      error: (err) => console.error(err)
    });
  }

  seleccionarAleatorios() {
    const ultimosIds = JSON.parse(sessionStorage.getItem('ultimosMostrados') || '[]');

    let candidatos = this.mensajes.filter(m => !ultimosIds.includes(m.id));

    if (candidatos.length < 2) {
      candidatos = [...this.mensajes];
    }

    for (let i = candidatos.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [candidatos[i], candidatos[j]] = [candidatos[j], candidatos[i]];
    }

    this.mensajesAleatorios = candidatos.slice(0, 2);

    sessionStorage.setItem(
      'ultimosMostrados',
      JSON.stringify(this.mensajesAleatorios.map(m => m.id))
    );
  }

  onSubmit(form: NgForm) {
    if (form.invalid) return;

    this.enviando = true;

    this.mensajeService.enviarMensaje(this.formulario).subscribe({
      next: () => {
        this.enviado = true;
        this.enviando = false;
        form.resetForm();
        this.formulario = { nombre: '', correo: '', asunto: '', mensaje: '' };
      },
      error: (err) => {
        console.error(err);
        this.enviando = false;
      }
    });
  }
}