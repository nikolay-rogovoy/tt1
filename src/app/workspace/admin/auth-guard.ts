import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from './auth-service';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';

/***/
@Injectable()
export class AuthGuard implements CanActivate {

    /***/
    constructor(private router: Router,
        private auth: AuthService) { }

    /***/
    canActivate(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> {

        if (!this.auth.authenticated) {
            return of(true);
            // this.router.navigateByUrl('/login');
        } else {
            // Генерим оповещение о входе пользователя
            return of(true);
        }
    }
}
