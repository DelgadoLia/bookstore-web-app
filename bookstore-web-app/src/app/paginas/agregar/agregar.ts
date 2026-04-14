import { Component, inject, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
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
    titulo: ['', [Validators.required, Validators.minLength(2)]],
    editorial: ['', [Validators.required, Validators.minLength(2)]],
    precio: ['', [Validators.required, Validators.min(1)]],
    stock: ['', [Validators.required, Validators.min(0)]],
    disponible: ['', [Validators.required, Validators.min(0)]],
    descripcion: ['', [Validators.required, Validators.minLength(10)]],
    imagen: ['']
  }, { validators: this.stockMayorQueDisponible });

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

  stockMayorQueDisponible(form: AbstractControl) {
    const stock = Number(form.get('stock')?.value);
    const disponible = Number(form.get('disponible')?.value);

    if (stock && disponible && disponible > stock) {
      return { disponibleMayorQueStock: true };
    }
    return null;
  }
}