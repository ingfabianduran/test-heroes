import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Heroes } from '../interfaces/hero-v2.interface';
import { Comics } from '../interfaces/hero-comics.interface';
import { HttpError, QueryParamsComics, QueryParamsHero } from '../interfaces/global.interface';
import { catchError, map } from 'rxjs/operators';
import * as moment from 'moment';

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
    return this.http.get<Comics | null>(`${this.root_url}/${params.heroId}/comics`, { params: queryParams }).pipe(
      map((res) => {
        const setResult = res.data.results;
        const formatPrice = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
        setResult.forEach(item => {
          item.description = item.description !== '' && item.description !== null ? item.description : 'Sin descripción';
          item.upc = item.upc !== '' ? item.upc : 'Sin UPC';
          item.formatThumbnail = `${item.thumbnail.path}.${item.thumbnail.extension}`;
          item.saleDateFormat = moment(item.dates[0].date).isValid() ? moment(item.dates[0].date).format('DD/MM/YYYY') : moment.parseZone(item.dates[0].date).format('MMMM D, YYYY, hh:mm:ss A [GMT]Z'),
          item.modifiedDateFormat = moment(item.modified).isValid() ? moment(item.modified).format('DD/MM/YYYY') : moment.parseZone(item.modified).format('MMMM D, YYYY, hh:mm:ss A [GMT]Z'),
          item.formatCreators = item.creators.items.map(res => res.name).join(' - '),
          item.formatCharacters = item.characters.items.map(res => res.name).join(' - '),
          item.formatPrintPrice = formatPrice.format(item.prices[0].price)          
        });
        const setComics = { ...res, data: { ...res.data, results: setResult } };
        return setComics;
      }),
      catchError(error => this.handleError(error))
    );
  }
}