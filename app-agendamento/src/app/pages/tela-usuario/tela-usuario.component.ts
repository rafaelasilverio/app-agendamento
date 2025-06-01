import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tela-usuario',
  imports: [CommonModule],
  templateUrl: './tela-usuario.component.html',
  styleUrl: './tela-usuario.component.scss'
})
export class TelaUsuarioComponent implements OnInit {
  nomeUsuario: string = '';
  tipoConta: 'CLIENT' | 'PROVIDER' | '' = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
    const usuario = localStorage.getItem('user');
    if (usuario) {
      const dados = JSON.parse(usuario);
      this.nomeUsuario = dados.name;
      this.tipoConta = dados.role;
    }
  }

  isCliente(): boolean {
    return this.tipoConta === 'CLIENT';
  }

  paginaGerenciarServicos() {
    this.router.navigate(['/manage-services']);
  }

  paginaAgendamentos() {
    this.router.navigate(['/my-schedules']);
  }

  paginaConfiguracoes() {
    this.router.navigate(['/profile-settings']);
  }

}
