import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class HttpClientInterceptor implements HttpInterceptor {

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const jwt = localStorage.getItem('jwt');

        if (jwt) {
            const cloned = request.clone({ headers: request.headers.set("Authorization", "Bearer " + jwt) });
            return next.handle(cloned);
        } else {
            return next.handle(request);
        }
    }
}