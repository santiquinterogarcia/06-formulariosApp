import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';

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
  /* Sin form builder */
  /* miFormulario: FormGroup = new FormGroup({
    nombre: new FormControl(''),
    precio: new FormControl(0),
    existencias: new FormControl(0),
  }); */

  /* Con form builder */

  miFormulario: FormGroup = this.fb.group({
    nombre: [null, [Validators.required, Validators.minLength(3)]],
    precio: [null, [Validators.required, Validators.min(0)]],
    existencias: [null, [Validators.required, Validators.min(0)]],
  });

  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    this.miFormulario.setValue({
      nombre: '',
      precio: 0,
      existencias: 0,
    });
  }

  campoNoEsValido(campo: string) {
    return (
      this.miFormulario.controls[campo].errors &&
      this.miFormulario.controls[campo].touched
    );
  }

  guardar() {
    if (this.miFormulario.valid) {
      console.log(this.miFormulario.value);
      this.miFormulario.reset();
    } else {
      this.miFormulario.markAllAsTouched();
    }
  }
}
