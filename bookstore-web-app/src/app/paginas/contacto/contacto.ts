import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contacto',
  imports: [CommonModule, FormsModule],
  templateUrl: './contacto.html',
  styleUrl: './contacto.scss',
})
export class Contacto {
  formulario={
    nombre:'',
    email:'',
    asunto: '',
    mensaje: ''
  };
  enviado=false;
  enviando=false;

  onSubmit(form: any){
    if(form.invalid) return;
    this.enviando=true;
    setTimeout(()=>{
      this.enviando=false;
      this.enviado=true;
      form.reset();
      setTimeout(()=>this.enviado=false, 4000);
    }, 1500);
  }
  

}

