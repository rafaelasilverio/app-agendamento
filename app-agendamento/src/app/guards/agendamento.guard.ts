// auth/agendamentos.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AgendamentosGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  canActivate(): boolean | UrlTree {
    const role = this.auth.getRole();
    return role === 'CLIENT' || role === 'PROVIDER' || this.router.parseUrl('/login');
  }
}
