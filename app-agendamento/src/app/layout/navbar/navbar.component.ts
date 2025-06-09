import { CommonModule } from '@angular/common';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarComponent, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  usuarioLogado: boolean = false;
  nomeUsuario: string = '';
  termoBuscaNavbar: string = '';

  private clearSearchListener: any;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.usuario$.subscribe(usuario => {
      this.usuarioLogado = !!usuario;
      this.nomeUsuario = usuario?.name ?? '';
    });
    // Limpa o campo de busca quando solicitado pelo catálogo
    this.clearSearchListener = () => {
      this.termoBuscaNavbar = '';
    };
    window.addEventListener('navbar-clear-search', this.clearSearchListener);
  }

  ngOnDestroy(): void {
    window.removeEventListener('navbar-clear-search', this.clearSearchListener);
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

  onInputBuscaNavbar(event: Event) {
    this.termoBuscaNavbar = (event.target as HTMLInputElement)?.value || '';
  }

  onClickBuscaNavbar() {
    // Dispara evento global para o catálogo
    const termo = this.termoBuscaNavbar?.trim();
    if (termo) {
      window.dispatchEvent(new CustomEvent('navbar-search', { detail: termo }));
      // Se não está no catálogo, navega para lá e passa termo
      if (!window.location.pathname.includes('service-catalog')) {
        this.router.navigate(['/service-catalog'], { state: { termoBusca: termo } });
      }
    }
  }
}
