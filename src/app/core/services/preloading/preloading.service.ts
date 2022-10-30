import { Injectable } from '@angular/core';
import { PreloadAllModules, Route } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreloadingService implements PreloadAllModules {

  preload(route: Route, fn: () => Observable<any>): Observable<any> {
    if (route.data && route.data['preload']) {
      return fn();
    } else {
      return of(null);
    }
  }

  constructor() { }
}
