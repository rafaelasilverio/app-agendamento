import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../../../../service/api.service';
import { AuthService } from '../../../../auth/auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogSuccessComponent } from '../../../../components/dialog-success/dialog-success.component';
import { ConfirmDialogComponent } from '../../../../components/confirm-dialog/confirm-dialog.component';

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
    private router: Router,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.inicializarFormularioPerfil();
    this.loadUserData();
  }

  private inicializarFormularioPerfil(): void {
    this.formPerfil = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      currentPassword: [''],
      newPassword: ['']
    });
  }

  loadUserData() {
    const token = localStorage.getItem('token')!;
    this.apiService.obterPerfil(token).subscribe({
      next: profile => {
        this.formPerfil.patchValue({
          name: profile.name,
          email: profile.email,
          phone: profile.phone
        });
      },
      error: () => alert('Erro ao carregar dados do perfil.')
    });
  }

  onSave() {
    if (this.formPerfil.invalid) return;

    const token = localStorage.getItem('token')!;
    this.apiService.atualizarPerfil(this.formPerfil.value, token).subscribe({
      next: () => {
        this.dialog.open(DialogSuccessComponent, {
          data: { mensagem: 'Perfil atualizado com sucesso!' }
        });
      },
      error: () => alert('Erro ao atualizar perfil.')
    });
  }

  deleteAccount() {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      data: {
        titulo: 'Confirmar exclusão',
        mensagem: 'Tem certeza que deseja excluir sua conta?'
      }
    });

    ref.afterClosed().subscribe(confirmed => {
      if (!confirmed) return;

      const token = localStorage.getItem('token')!;
      this.apiService.deletarConta(token).subscribe({
        next: () => {
          // 1) desloga AGORA e limpa o header
          this.authService.logout();

          // 2) abre diálogo de sucesso (com header já limpo)
          const successRef = this.dialog.open(DialogSuccessComponent, {
            data: { mensagem: 'Conta excluída com sucesso!' }
          });

          // 3) quando o diálogo fechar, navega pra rota pública:
          successRef.afterClosed().subscribe(() => {
            this.router.navigate(['/home']); // ou '/login', como preferir
          });
        },
        error: () => alert('Erro ao excluir conta.')
      });
    });
  }

}
