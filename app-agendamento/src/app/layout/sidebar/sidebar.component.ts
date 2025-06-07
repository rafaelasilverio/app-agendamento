import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  tipoConta: 'CLIENT' | 'PROVIDER' | 'ADMIN' = 'CLIENT';
  nomeUsuario: string = '';
  estaLogado: boolean = false;

  constructor(
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.auth.usuario$.subscribe(usuario => {
      this.estaLogado = !!usuario;
      this.tipoConta = usuario?.role ?? 'CLIENT';
      this.nomeUsuario = usuario?.name ?? '';
    });
  }

  paginaInicio() {
    this.router.navigate(['/user']);
  }

  paginaMeusAgendamentos() {
    this.router.navigate(['user/my-schedules']);
  }

  paginaConfiguracoes() {
    this.router.navigate(['/profile-settings']);
  }

  paginaGerenciarServicos() {
    this.router.navigate(['/manage-services']);
  }

  paginaCadastrarServico() {
    this.router.navigate(['/manage-services']);
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/home']);
  }
}
