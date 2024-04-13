import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Heroes } from '../interfaces/hero-v2.interface';
import { Comics } from '../interfaces/hero-comics.interface';
import { HttpError, QueryParamsComics, QueryParamsHero } from '../interfaces/global.interface';
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class HeroesService {
  private root_url: string = `${environment.API_URL}characters`;

  constructor(private http: HttpClient) { }

  /**
    * @author Fabian Duran
    * @createdate 2024-04-13
    * Metodo que retorna un posible error al llamado de una peticion HTTP.
    * @param error Informacion del error
    * @returns Observable con la informacion del error
  */
  handleError(error: HttpErrorResponse): Observable<never> {
    const dataError: HttpError = { status: error.status, message: error.message };
    return throwError(() => dataError);
  }
  /**
    * @author Fabian Duran
    * @createdate 2024-04-12
    * Metodo que trae los heroes registrados en el sistema.
    * @param params Parametros de busqueda
  */
  getHeroesV2(params: QueryParamsHero): Observable<Heroes> {
    let queryParams = new HttpParams()
      .append('limit', params.limit.toString())
      .append('offset', params.offset.toString());
    if (params.name) queryParams = queryParams.append('nameStartsWith', params.name);
    return this.http.get<Heroes>(this.root_url, { params: queryParams }).pipe(
      catchError(error => this.handleError(error))
    );
  }
  /**
    * @author Fabian Duran
    * @createdate 2024-04-13
    * Metodo que trae los comics asociados a un heroe.
    * @param params Parametros de busqueda
  */
  getComicsByHero(params: QueryParamsComics): Observable<Comics> {
    let queryParams = new HttpParams()
      .append('limit', params.limit.toString())
      .append('offset', params.offset.toString());
    return this.http.get<Comics>(`${this.root_url}/${params.heroId}/comics`, { params: queryParams }).pipe(
      catchError(error => this.handleError(error))
    );
  }
}