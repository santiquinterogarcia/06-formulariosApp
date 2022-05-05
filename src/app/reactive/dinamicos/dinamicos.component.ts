import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styles: [
    `
      .minAlto {
        min-height: 24px;
      }
    `,
  ],
})
export class DinamicosComponent implements OnInit {
  a = 0;

  miFormulario: FormGroup = this.fb.group({
    nombre: [null, [Validators.required, Validators.minLength(3)]],
    favoritos: this.fb.array(
      [['God of war', Validators.required]],
      Validators.required
    ),
  });

  nuevoFavorito: FormControl = this.fb.control('', Validators.required);

  get favoritosArr() {
    return this.miFormulario.get('favoritos') as FormArray;
  }

  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    this.miFormulario.setValue({
      nombre: 'Santi',
      favoritos: ['God of war'],
    });
  }

  campoNoEsValido(campo: string) {
    return (
      this.miFormulario.controls[campo].errors &&
      this.miFormulario.controls[campo].touched
    );
  }

  agregarFavorito() {
    if (this.nuevoFavorito.valid) {
      this.favoritosArr.push(
        this.fb.control(this.nuevoFavorito.value, Validators.required)
      );
      this.nuevoFavorito.reset();
    }
  }

  guardar() {
    if (this.miFormulario.valid) {
      console.log(this.miFormulario.value);
      this.miFormulario.reset();
    } else {
      this.miFormulario.markAllAsTouched();
    }
  }

  eliminar(index: number) {
    this.favoritosArr.removeAt(index);
  }
}
