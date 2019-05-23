import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  private checkAuthState(redirect: string): Observable<boolean> {
    return this.authService.isAtuthenticate.pipe(
      tap(is => {
        if (!is) {
          this.router.navigate(['/login'], {
            // /login?redirect=/tasks/create
            queryParams: { redirect }
          });
        }
      })
    );
  }
}
