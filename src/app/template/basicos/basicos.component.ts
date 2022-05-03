import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styles: [
    `
      .minAlto {
        min-height: 24px;
      }
    `,
  ],
})
export class BasicosComponent implements OnInit {
  @ViewChild('miFormulario') miFormulario!: NgForm;

  initForm = {
    producto: '',
    precio: 0,
    existencias: 0,
  };

  constructor() {}

  ngOnInit(): void {}

  nombreInvalido(): boolean {
    return (
      this.miFormulario?.controls['producto']?.invalid &&
      this.miFormulario?.controls['producto']?.touched &&
      !this.miFormulario?.controls['producto']?.pristine
    );
  }

  precioInvalido(): boolean {
    return this.miFormulario?.controls['precio']?.value < 0;
  }

  guardar() {
    console.log(this.miFormulario);
    this.miFormulario.resetForm({ producto: '', precio: 0, existencias: 0 });
  }
}
