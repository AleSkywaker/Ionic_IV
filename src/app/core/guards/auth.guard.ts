import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
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
