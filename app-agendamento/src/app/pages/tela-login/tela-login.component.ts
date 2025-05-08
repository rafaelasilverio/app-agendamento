import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tela-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tela-login.component.html',
  styleUrls: ['./tela-login.component.scss']
})
export class TelaLoginComponent {
  constructor(private router: Router) { }

  paginaCadastrarUsuarios() {
    this.router.navigate(['/register']);
  }

  paginaRecuperacaoSenha() {
    this.router.navigate(['/recover-password']);
  }
}
