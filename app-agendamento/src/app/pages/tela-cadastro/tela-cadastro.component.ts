import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../service/api.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogSuccessComponent } from '../../components/dialog-success/dialog-success.component'
import { NgxMaskDirective } from 'ngx-mask'


@Component({
  selector: 'app-tela-cadastro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule, DialogSuccessComponent, NgxMaskDirective],
  templateUrl: './tela-cadastro.component.html',
  styleUrls: ['./tela-cadastro.component.scss']
})
export class TelaCadastroComponent implements OnInit {
  formUsuario!: FormGroup;
  mostrarSenha = false;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.inicializarFormulario();
  }

  private inicializarFormulario(): void {
    this.formUsuario = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phone: ['', Validators.required]
    });
  }

  private obterTipoConta(): 'CLIENT' | 'PROVIDER' {
    const tipo = localStorage.getItem('tipoConta');
    if (tipo === 'PROVIDER') return 'PROVIDER';
    return 'CLIENT';
  }

  toggleSenha(): void {
    this.mostrarSenha = !this.mostrarSenha;
  }

  cadastrarUsuario(): void {
    if (this.formUsuario.valid) {
      const tipoConta = this.obterTipoConta();

      const dados = {
        name: this.formUsuario.value.name,
        email: this.formUsuario.value.email,
        password: this.formUsuario.value.password,
        phone: this.formUsuario.value.phone,
        role: tipoConta
      };

      this.apiService.cadastrarUsuario(dados).subscribe({
        next: () => {
          this.dialog.open(DialogSuccessComponent);
          this.formUsuario.reset();
          localStorage.removeItem('tipoConta');
          this.router.navigate([tipoConta === 'CLIENT' ? '/login' : '/login-provider']);
        },
        error: (err) => {
          if (err?.error?.message === 'Este e-mail já está cadastrado.') {
            alert('Este e-mail já está cadastrado. Tente fazer login ou use outro.');
          } else {
            alert('Erro ao realizar cadastro. Tente novamente.');
          }
        }
      });
    } else {
      this.formUsuario.markAllAsTouched();
    }
  }
}
