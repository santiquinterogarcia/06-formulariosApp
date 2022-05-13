import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  RESTPaisesResponse,
  Pais2,
  PaisSmall,
} from '../interfaces/paises.interface';
import { combineLatest, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaisesService {
  private baseUrlV2: string = 'https://restcountries.com/v2/';
  private baseUrlV3: string = 'https://restcountries.com/v3.1/';

  private _continentes: string[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
  ];

  get continentes() {
    return [...this._continentes];
  }

  constructor(private http: HttpClient) {}

  getPaisesByContinente(continente: string): Observable<RESTPaisesResponse[]> {
    return this.http.get<RESTPaisesResponse[]>(
      `${this.baseUrlV3}region/${continente}?fields=cca3,name`
    );
  }

  getPaisByCode(codigoPais: string): Observable<Pais2 | null> {
    if (!codigoPais) {
      return of(null);
    }

    return this.http.get<Pais2>(`${this.baseUrlV2}alpha/${codigoPais}`);
  }

  getNamePaisByCode(codigoPais: string): Observable<PaisSmall> {
    return this.http.get<PaisSmall>(
      `${this.baseUrlV2}alpha/${codigoPais}?fields=name,alpha3Code`
    );
  }

  getNamePaisesByCodes(borders: string[]): Observable<PaisSmall[]> {
    if (!borders) {
      return of([]);
    } else {
      const peticiones: Observable<PaisSmall>[] = [];

      borders.forEach((code) => {
        const peticion = this.getNamePaisByCode(code);
        peticiones.push(peticion);
      });
      return combineLatest(peticiones);
    }
  }
}
