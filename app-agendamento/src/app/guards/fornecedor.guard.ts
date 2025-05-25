// src/app/auth/fornecedor.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})

export class FornecedorGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  canActivate(): boolean | UrlTree {
    return this.auth.getRole() === 'PROVIDER' || this.router.parseUrl('/login-provider');
  }
}
