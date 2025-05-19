import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  tipoConta: 'CLIENT' | 'PROVIDER' | 'ADMIN' = 'CLIENT';
  nomeUsuario: string = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
    const usuario = localStorage.getItem('usuario');
    if (usuario) {
      const dados = JSON.parse(usuario);
      this.tipoConta = dados.role;
      this.nomeUsuario = dados.nome;
    }
  }

  paginaInicio() {
    this.router.navigate(['/user']);
  }

  paginaMeusAgendamentos() {
    this.router.navigate(['/my-schedules']);
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
}
