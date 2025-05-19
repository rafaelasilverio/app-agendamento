import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tela-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tela-login.component.html',
  styleUrls: ['./tela-login.component.scss']
})
export class TelaLoginComponent implements OnInit {
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
