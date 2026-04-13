import { Component, inject, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductoService } from '../../core/services/producto';

@Component({
  selector: 'app-agregar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './agregar.html',
  styleUrl: './agregar.scss'
})
export class Agregar {
  private fb = inject(FormBuilder);
  private productoService = inject(ProductoService);

  @ViewChild('imagenInput') imagenInput!: ElementRef<HTMLInputElement>;

  imagenPreview: string | null = null;
  imagenFile: File | null = null;
  productoAgregado = false;

  form: FormGroup = this.fb.group({
    nombre:      ['', [Validators.required, Validators.minLength(2)]],
    categoria:   ['', Validators.required],
    editorial:   ['', [Validators.required, Validators.minLength(2)]],
    tomo:        ['', [Validators.required, Validators.min(1)]],
    precio:      ['', [Validators.required, Validators.min(1)]],
    stock:       ['', [Validators.required, Validators.min(0)]],
    disponible:  ['', [Validators.required, Validators.min(0)]],
    descripcion: ['', [Validators.required, Validators.minLength(10)]],
  });

  onImagenSeleccionada(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      this.imagenFile = input.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        this.imagenPreview = reader.result as string;
      };
      reader.readAsDataURL(this.imagenFile);
    }
  }

  onSubmit() {
    if (this.form.invalid) return;

    const formData = new FormData();
    formData.append('nombre',      this.form.value.nombre);
    formData.append('categoria',   this.form.value.categoria);
    formData.append('editorial',   this.form.value.editorial);
    formData.append('tomo',        this.form.value.tomo);
    formData.append('precio',      this.form.value.precio);
    formData.append('stock',       this.form.value.stock);
    formData.append('disponible',  this.form.value.disponible);
    formData.append('descripcion', this.form.value.descripcion);

    if (this.imagenFile) {
      formData.append('imagen', this.imagenFile);
    }

    this.productoService.agregarProducto(formData).subscribe({
      next: () => {
        this.productoAgregado = true;
        this.imagenPreview = null;
        this.imagenFile = null;
        this.imagenInput.nativeElement.value = '';
        this.form.reset();
        setTimeout(() => this.productoAgregado = false, 3000);
      },
      error: () => {
        this.productoAgregado = false;
      }
    });
  }
}