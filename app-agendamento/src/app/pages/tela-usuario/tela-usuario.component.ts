import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-tela-usuario',
  imports: [CommonModule],
  templateUrl: './tela-usuario.component.html',
  styleUrl: './tela-usuario.component.scss'
})
export class TelaUsuarioComponent implements OnInit {
  nomeUsuario: string = '';
  tipoConta: 'CLIENT' | 'PROVIDER' | '' = '';

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    const usuario = this.authService.getUsuarioAtual();
    if (usuario) {
      this.nomeUsuario = usuario.name;
      this.tipoConta = usuario.role;
    }
  }

  isCliente(): boolean {
    return this.tipoConta === 'CLIENT';
  }

  paginaGerenciarServicos() {
    this.router.navigate(['/manage-services']);
  }

  paginaAgendamentos() {
    this.router.navigate(['user/my-schedules']);
  }

  paginaConfiguracoes() {
    this.router.navigate(['/profile-settings']);
  }

}
