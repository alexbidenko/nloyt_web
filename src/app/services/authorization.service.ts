import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Employee, ResponseModel} from '../models/interfaces';
import {AppService} from './app.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor(
    private httpClient: HttpClient,
    @Inject('BASE_URL') private baseUrl: string
  ) { }

  login(body: {email: string, password: string}): Observable<any> {
    return this.httpClient.post(this.baseUrl + 'api/employee/login', body);
  }

  sendPhoneCode(phone: string): Observable<ResponseModel<any>> {
    return this.httpClient.post<ResponseModel<any>>(this.baseUrl + 'api/employee/phoneCode', {phone});
  }

  addAdmin(authorization: {
    country: string,
    phone: string,
    firstName: string,
    lastName: string,
    email: string,
    code: number
  }): Observable<ResponseModel<Employee>> {
    return this.httpClient.post<ResponseModel<Employee>>(this.baseUrl + 'api/employee', authorization, {
      headers: new HttpHeaders({
        Language: AppService.getLang()
      })
    });
  }

  adminSetPassword(password: string, secretKey: string): Observable<ResponseModel<Employee>> {
    return this.httpClient.post<ResponseModel<Employee>>(`${this.baseUrl}api/employee/password`, {password}, {
      headers: new HttpHeaders({
        'Password-Key': secretKey
      })
    });
  }

  addService(body: FormData): Observable<ResponseModel<any>> {
    return this.httpClient.post<ResponseModel<any>>('http://194.182.85.89/api/service', body, {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem('userToken')
      })
    });
  }
}
