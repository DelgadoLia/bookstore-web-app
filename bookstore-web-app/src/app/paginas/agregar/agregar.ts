import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductoService } from '../../core/services/producto';
import { Producto } from '../../core/models/producto.model';

@Component({
  selector: 'app-agregar',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './agregar.html',
  styleUrl: './agregar.scss'
})
export class Agregar {
  private fb = inject(FormBuilder);
  private productoService = inject(ProductoService);

  imagenPreview: string | null = null;
  productoAgregado = false;

  form: FormGroup = this.fb.group({
    titulo:      ['', [Validators.required, Validators.minLength(2)]],
    autor:       ['', [Validators.required, Validators.minLength(2)]],
    precio:      ['', [Validators.required, Validators.min(1)]],
    stock:       ['', [Validators.required, Validators.min(0)]],
    disponible:  ['', [Validators.required, Validators.min(0)]],
    volumen:     ['', [Validators.required, Validators.min(1)]],
    genero:      ['', Validators.required],
    descripcion: ['', [Validators.required, Validators.minLength(10)]],
    imagen:      ['']
  });

  onImagenSeleccionada(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagenPreview = reader.result as string;
        this.form.patchValue({ imagen: this.imagenPreview });
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  onSubmit() {
  if (this.form.invalid) return;
  this.productoService.agregarProducto(this.form.value).subscribe({
    next: () => {
      this.productoAgregado = true;
      this.imagenPreview = null;
      this.form.reset();
      setTimeout(() => this.productoAgregado = false, 3000);
    },
    error: () => {
      this.productoAgregado = false;
    }
  });
}
}
