import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

interface Persona {
  nombre: string;
  favoritos: Favorito[];
}

interface Favorito {
  id: number;
  nombre: string;
}
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
export class DinamicosComponent {
  persona: Persona = {
    nombre: 'Santiago',
    favoritos: [
      {
        id: 1,
        nombre: "Assansin's creed",
      },
      {
        id: 2,
        nombre: 'GTA',
      },
    ],
  };

  nuevoJuego: string = '';

  @ViewChild('miFormulario') miFormulario!: NgForm;

  guardar() {
    console.log(this.miFormulario.controls['nombre'].value);
  }

  agregar() {
    const nuevoFavorito: Favorito = {
      id: this.persona.favoritos.length + 1,
      nombre: this.nuevoJuego,
    };

    this.persona.favoritos.push({ ...nuevoFavorito });
    this.nuevoJuego = '';
  }

  eliminar(index: number) {
    this.persona.favoritos.splice(index, 1);
  }
}
