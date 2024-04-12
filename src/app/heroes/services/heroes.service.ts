import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Heroes, QueryParamsHero } from '../interfaces/hero-v2.interface';

@Injectable({ providedIn: 'root' })
export class HeroesService {
  private root_url: string = `${environment.API_URL}characters`;

  constructor(private http: HttpClient) {}

  getHeroesV2(params: QueryParamsHero): Observable<Heroes> {
    let queryParams = new HttpParams()
      .append('limit', params.limit.toString())
      .append('offset', params.offset.toString());
    if (params.name) queryParams = queryParams.append('nameStartsWith', params.name);
    return this.http.get<Heroes>(this.root_url, { params: queryParams });
  }
}