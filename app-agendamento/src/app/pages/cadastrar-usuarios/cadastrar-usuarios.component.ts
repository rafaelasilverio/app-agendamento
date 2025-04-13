import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastrar-usuarios',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cadastrar-usuarios.component.html',
  styleUrls: ['./cadastrar-usuarios.component.scss']
})
export class CadastrarUsuariosComponent {
  formUsuario!: FormGroup;
  mostrarSenha = false;

  constructor(private fb: FormBuilder) {
    this.formUsuario = this.fb.group({
      nome: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      telefone: ['', [Validators.required]]
    });
  }

  toggleSenha(): void {
    this.mostrarSenha = !this.mostrarSenha;
  }

  cadastrarUsuario(): void {
    if (this.formUsuario.valid) {
      const dados = this.formUsuario.value;
      console.log('Usuário cadastrado:', dados);
      // Aqui você pode fazer um POST para uma API, por exemplo
    } else {
      this.formUsuario.markAllAsTouched();
    }
  }
}
