import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

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

  constructor(private fb: FormBuilder) {}

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
    console.log('Carregando dados do usuário...');
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
      console.log('Salvando alterações:', this.formPerfil.value);
      alert('Perfil atualizado com sucesso!');
      // Aqui você chamaria o backend para salvar os dados
    } else {
      alert('Por favor, preencha os campos obrigatórios.');
    }
  }

  deleteAccount() {
    if (confirm('Tem certeza que deseja deletar sua conta?')) {
      console.log('Deletando conta do usuário...');
      // this.settingsService.deleteAccount().subscribe(() => redirect to login or home);
    }
  }
}
