import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../service/api.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-tela-login-prestador',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './tela-login-prestador.component.html',
  styleUrl: './tela-login-prestador.component.scss'
})
export class TelaLoginPrestadorComponent implements OnInit {
  loginForm!: FormGroup;
  tipoSelecionado: 'CLIENT' | 'PROVIDER' | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private api: ApiService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.inicializarFormulario();
    this.verificarTipoConta();
  }

  inicializarFormulario(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  verificarTipoConta(): void {
    this.route.queryParams.subscribe(params => {
      const tipo = params['tipo'];
      if (tipo === 'CLIENT' || tipo === 'PROVIDER') {
        this.tipoSelecionado = tipo;
      }
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const dados = this.loginForm.value;

    this.api.login(dados).subscribe({
      next: (res: any) => {
        console.log('Resposta do login:', res);
        if (!res || !res.user || !res.access_token) {
          alert('Erro ao fazer login: resposta inválida da API.');
          return;
        }
        this.authService.login(res.user, res.access_token);
        this.router.navigate(['/user']);
      },
      error: (err) => {
        if (err?.status === 401) {
          this.loginForm.setErrors({ invalidLogin: true });
        } else {
          alert('Erro inesperado. Tente novamente mais tarde.');
        }
      }
    });
  }

  private redirecionarPosLogin(role: string): void {
    if (role === 'CLIENT' || role === 'PROVIDER') {
      this.router.navigate(['/user']);
    } else {
      alert('Tipo de conta inválido ou não suportado.');
      this.router.navigate(['/login-provider']);
    }
  }


  paginaCadastrarUsuarios() {
    this.router.navigate(['/register-choice']);
  }

  paginaRecuperacaoSenha() {
    this.router.navigate(['/recover-password']);
  }
}
