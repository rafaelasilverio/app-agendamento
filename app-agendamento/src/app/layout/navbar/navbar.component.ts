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

  paginaInicial() {
    this.router.navigate(['/home']);
  }

  paginaCatalogoServicos() {
    this.router.navigate(['/service-catalog']);
  }

  paginaSobre() {
    this.router.navigate(['/about']);
  }

  paginaLogin() {
    this.router.navigate(['/login']);
  }

  paginaCadastrarUsuarios() {
    this.router.navigate(['/register']);
  }
}
