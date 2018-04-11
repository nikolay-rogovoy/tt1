import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AppConfig} from '../../app.config';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';

/**Базовый сервис*/
@Injectable()
export class ServiceProvider {

    constructor(public http: HttpClient,
                public appConfig: AppConfig) {
    }

    /**Авторизация*/
    authenticate(user: string, pass: string): Observable<boolean> {

        return this.http.post(`${this.appConfig.config.host}login`, { user: user, pass: pass },
            {headers: ServiceProvider.getPostHeaders()})
            .pipe(map((result: any) => {
                if (result.success) {
                    localStorage.setItem('auth_token', result.token);
                    localStorage.setItem('idcustomer', result.user.idcustomer);
                    localStorage.setItem('idcustomerkey', result.user.idcustomerkey);
                    localStorage.setItem('customer_name', result.user.customer_name);
                } else {
                    localStorage.removeItem('auth_token');
                    localStorage.removeItem('idcustomer');
                    localStorage.removeItem('idcustomerkey');
                    localStorage.removeItem('customer_name');

                }
                return result.success;
            }));
    }

    static getPostHeaders(): HttpHeaders {
        let headers = new HttpHeaders();
        headers.set('Content-Type', 'application/json');
        return headers;
    }
}

