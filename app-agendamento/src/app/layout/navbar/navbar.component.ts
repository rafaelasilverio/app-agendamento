import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  usuarioLogado: boolean = false;
  nomeUsuario: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.usuario$.subscribe(usuario => {
      this.usuarioLogado = !!usuario;
      this.nomeUsuario = usuario?.name ?? '';
    });
  }

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

  paginaPrestador() {
    this.router.navigate(['/login-provider']);
  }

  paginaCadastrarUsuarios() {
    this.router.navigate(['/register-choice']);
  }

  sair() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }
}
