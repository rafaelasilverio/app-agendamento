import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../../service/api.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-tela-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './tela-login.component.html',
  styleUrls: ['./tela-login.component.scss']
})
export class TelaLoginComponent implements OnInit {
  public loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router,
    private authService: AuthService

  ) { }

  ngOnInit(): void {
    this.inicializarFormulario();
  }

  private inicializarFormulario(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required] // 👈 mudou de 'senha' para 'password'
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched(); // força exibir erros
      return;
    }

    const dados = this.loginForm.value;

    this.api.login(dados).subscribe({
      next: (res: any) => {
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
      this.router.navigate(['/login']); // fallback seguro
    }
  }


  paginaCadastrarUsuarios() {
    this.router.navigate(['/register-choice']);
  }

  paginaRecuperacaoSenha() {
    this.router.navigate(['/recover-password']);
  }
}
