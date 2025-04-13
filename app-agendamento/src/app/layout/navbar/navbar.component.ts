import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  constructor(private router: Router) { }

  paginaLogin() {
    this.router.navigate(['/login-in']);
  }

  paginaCadastrarUsuarios() {
    this.router.navigate(['/cadastrar-se']);
  }

  paginaCadastrarServicos() {
    this.router.navigate(['/cadastrar-servicos']);
  }

  paginaCatalogoServicos() {
    this.router.navigate(['/catalogo-servicos']);
  }
  paginaSobre() {
    this.router.navigate(['/sobre']);
  }
}
