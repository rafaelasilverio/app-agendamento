import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tela-login-prestador',
  imports: [CommonModule],
  templateUrl: './tela-login-prestador.component.html',
  styleUrl: './tela-login-prestador.component.scss'
})
export class TelaLoginPrestadorComponent {
  tipoSelecionado: 'CLIENT' | 'PROVIDER' | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const tipo = params['tipo'];
      if (tipo === 'CLIENT' || tipo === 'PROVIDER') {
        this.tipoSelecionado = tipo;
        console.log('Tipo selecionado:', tipo);
      }
    });
  }

  paginaCadastrarUsuarios() {
    this.router.navigate(['/register']);
  }

  paginaRecuperacaoSenha() {
    this.router.navigate(['/recover-password']);
  }
}
