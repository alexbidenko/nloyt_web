import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {ResponseModel} from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(
    @Inject('BASE_URL') private baseUrl: string,
    private http: HttpClient
  ) { }

  static getLang(): string {
    if (localStorage.getItem('defaultLang')) {
      return localStorage.getItem('defaultLang');
    } else {
      switch (window.navigator.language ||
      // @ts-ignore
      window.navigator.systemLanguage || window.navigator.userLanguage) {
        case 'en-US':
          return 'en-US';
        case 'ru-RU':
          return 'ru-RU';
        default:
          return 'en-US';
      }
    }
  }

  getGetParams(): any {
    return window
      .location
      .search
      .replace('?', '')
      .split('&')
      .reduce(
        (p, e) => {
          const a = e.split('=');
          p[decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
          return p;
        },
        {}
      );
  }

  checkAddress(address: string): Observable<ResponseModel<{latitude: number, longitude: number}>> {
    return this.http.get<any>(this.baseUrl + '/api/data/address/' + address);
  }
}
