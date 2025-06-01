import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(): boolean {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');


    if (!token || !user) {
      const tipoConta = localStorage.getItem('tipoConta');
      this.router.navigate([tipoConta === 'PROVIDER' ? '/login-provider' : '/login']);
      return false;
    }

    return true;
  }

}
