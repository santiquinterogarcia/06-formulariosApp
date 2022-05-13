import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PaisesService } from '../../services/paises.service';
import {
  RESTPaisesResponse,
  PaisSmall,
} from '../../interfaces/paises.interface';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styles: [],
})
export class SelectorComponent implements OnInit {
  miFormulario: FormGroup = this.fb.group({
    continente: ['', Validators.required],
    pais: ['', Validators.required],
    frontera: ['', Validators.required],
  });

  continentes: string[] = [];
  paises: RESTPaisesResponse[] = [];
  /* fronteras: string[] = []; */
  fronteras: PaisSmall[] = [];

  /* UI */
  cargando: boolean = false;

  constructor(private fb: FormBuilder, private paisesService: PaisesService) {}

  ngOnInit(): void {
    this.continentes = this.paisesService.continentes;

    /* Cuando cambia Región sin operadores rxjs */
    /* this.miFormulario
      .get('continente')
      ?.valueChanges.subscribe((continente) => {
        this.paisesService
          .getPaisesByContinente(continente)
          .subscribe((paises) => {
            this.paises = paises;
          });
      }); */

    /* Cuando cambia Región con operadores de rxjs */
    this.miFormulario
      .get('continente')
      ?.valueChanges.pipe(
        tap(() => {
          this.miFormulario.get('pais')?.reset('');
          this.cargando = true;
        }),
        switchMap((continente) =>
          this.paisesService.getPaisesByContinente(continente)
        )
      )
      .subscribe((paises) => {
        this.paises = paises;
        this.cargando = false;
      });

    /* Cuando cambia País con operadores de rxjs */
    this.miFormulario
      .get('pais')
      ?.valueChanges.pipe(
        tap(() => {
          this.miFormulario.get('frontera')?.reset('');
          this.cargando = true;
        }),
        switchMap((codigoPais) => this.paisesService.getPaisByCode(codigoPais)),
        switchMap((pais) =>
          this.paisesService.getNamePaisesByCodes(pais?.borders!)
        )
      )
      .subscribe((paises) => {
        /* this.fronteras = pais?.borders || []; */
        this.fronteras = paises;
        this.cargando = false;
      });
  }

  guardar() {
    console.log(this.miFormulario.value);
  }
}
