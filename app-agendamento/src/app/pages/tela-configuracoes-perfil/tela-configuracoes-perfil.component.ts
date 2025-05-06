import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tela-configuracoes-perfil',
  imports: [CommonModule],
  templateUrl: './tela-configuracoes-perfil.component.html',
  styleUrl: './tela-configuracoes-perfil.component.scss'
})
export class TelaConfiguracoesPerfilComponent implements OnInit {

  ngOnInit() {
    this.loadUserData();
  }

  usuario = {
    nome: '',
    email: '',
    telefone: '',
    endereco: '',
    servicos: [
      { id: 1, titulo: 'Design Gráfico', descricao: 'Criação de banners e logos.' },
      { id: 2, titulo: 'Eletricista', descricao: 'Instalação de tomadas e iluminação.' }
      // Você pode inicializar vazio [] e buscar do backend
    ]
  };

  loadUserData() {
    // Aqui você pode chamar o serviço Angular para buscar os dados do usuário no backend
    console.log('Carregando dados do usuário...');
    // Exemplo fictício:
    // this.settingsService.getUserProfile().subscribe(data => this.user = data);
  }

  onSave() {
    console.log('Salvando alterações do usuário...', this.usuario);
    // Aqui você chamaria o backend para salvar os dados
    // this.settingsService.updateProfile(this.user).subscribe(() => alert('Perfil atualizado!'));
  }

  editServico(servico: any) {
    console.log('Editando serviço:', servico);
    // Abrir modal ou navegar para a tela de edição
  }

  deleteServico(id: number) {
    console.log('Deletando serviço com ID:', id);
    // this.settingsService.deleteServico(id).subscribe(() => this.loadUserData());
  }

  addServico() {
    console.log('Adicionando novo serviço...');
    // Navegar para tela de adicionar serviço ou abrir modal
  }

  deleteAccount() {
    if (confirm('Tem certeza que deseja deletar sua conta?')) {
      console.log('Deletando conta do usuário...');
      // this.settingsService.deleteAccount().subscribe(() => redirect to login or home);
    }
  }
}
