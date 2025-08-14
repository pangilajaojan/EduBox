import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Auth, authState } from '@angular/fire/auth';
import { map, take, filter, timeout, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: Auth, private router: Router) {}

  canActivate() {
    return authState(this.auth).pipe(
      filter(user => user !== undefined), // Wait for auth state to be determined
      timeout(10000), // 10 second timeout
      take(1),
      map(user => {
        if (user) {
          return true;
        } else {
          this.router.navigate(['/auth']);
          return false;
        }
      }),
      catchError(() => {
        // If timeout or error, redirect to auth
        this.router.navigate(['/auth']);
        return of(false);
      })
    );
  }
}
