import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../../../../service/api.service';
import { AuthService } from '../../../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tela-configuracoes-perfil',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './tela-configuracoes-perfil.component.html',
  styleUrl: './tela-configuracoes-perfil.component.scss'
})
export class TelaConfiguracoesPerfilComponent implements OnInit {
  formPerfil!: FormGroup;
  fotoPreview: string | null = null;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.formPerfil = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefone: [''],
      endereco: [''],
      senhaAtual: [''],
      novaSenha: ['']
    });

    this.loadUserData();
  }

  loadUserData() {
    // Exemplo fictício:
    this.formPerfil.patchValue({
      nome: 'Usuário Exemplo',
      email: 'usuario@exemplo.com',
      telefone: '(11) 99999-9999',
      endereco: 'Rua Exemplo, 123'
    });
  }

  onSave() {
    if (this.formPerfil.valid) {
      alert('Perfil atualizado com sucesso!');
    } else {
      alert('Por favor, preencha os campos obrigatórios.');
    }
  }

  deleteAccount() {
    if (confirm('Tem certeza que deseja deletar sua conta?')) {
      const token = localStorage.getItem('token');
      this.apiService.deletarConta(token!).subscribe({
        next: () => {
          this.authService.logout();
          this.router.navigate(['/login']);
        },
        error: () => alert('Erro ao excluir conta.')
      });
    }
  }
}
