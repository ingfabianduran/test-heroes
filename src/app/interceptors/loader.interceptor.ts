import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const queryParams = request.params
      .append('ts', environment.TS)
      .append('apikey', environment.PUBLIC_KEY)
      .append('hash', environment.HASH);
    const cloneRequest = request.clone({ params: queryParams });
    return next.handle(cloneRequest).pipe(
      finalize(() => {
        
      })
    );
  }
}