import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = '';

    // Tarayıcı ortamında çalışıp çalışmadığını kontrol et
    if (typeof window !== 'undefined') {
      token = localStorage.getItem("token") || '';
    }

    let newRequest = req;

    if (token) {
      newRequest = req.clone({
        headers: req.headers.set("Authorization", "Bearer " + token)
      });
    }

    return next.handle(newRequest);
  }
}
