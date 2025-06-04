import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CardServicesComponent } from '../../../../components/card-services/card-services.component';
import { ModalGerenciarServicosComponent } from '../modal-gerenciar-servicos/modal-gerenciar-servicos.component';
import { AuthService } from '../../../../auth/auth.service';
import { ApiService } from '../../../../../service/api.service';

@Component({
  selector: 'app-tela-gerenciamento-servicos',
  standalone: true,
  imports: [
    CommonModule,
    CardServicesComponent,
    ModalGerenciarServicosComponent
  ],
  templateUrl: './tela-gerenciamento-servicos.component.html',
  styleUrl: './tela-gerenciamento-servicos.component.scss'
})
export class TelaGerenciamentoServicosComponent implements OnInit {
  listarServicos: any[] = [];
  visivelModal: boolean = false;
  modo: 'criar' | 'editar' = 'criar';
  servicoSelecionado: any = null;

  token: string = '';

  constructor(
    private api: ApiService,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token') || '';
    this.carregarServicos();
  }

  carregarServicos() {
    this.api.buscarMeusServicos(this.token).subscribe({
      next: (res: any) => this.listarServicos = res,
      error: () => alert('Erro ao carregar seus serviços'),
    });
  }

  abrirModalCadastro(): void {
    this.modo = 'criar';
    this.servicoSelecionado = null;
    this.visivelModal = true;
  }

  abrirModalEdicao(servico: any): void {
    this.modo = 'editar';
    this.servicoSelecionado = servico;
    this.visivelModal = true;
  }

  fecharModal(): void {
    this.visivelModal = false;
  }

  cancelarModal(): void {
    this.fecharModal();
  }

  salvarServico(dados: any): void {
    const token = localStorage.getItem('token') || '';
    if (this.modo === 'criar') {
      this.api.cadastrarServico(dados, token).subscribe({
        next: () => {
          this.fecharModal();
          this.carregarServicos();
          alert('Serviço cadastrado com sucesso!');
        },
        error: () => alert('Erro ao cadastrar serviço'),
      });
    } else if (this.servicoSelecionado?.id) {
      this.api.atualizarServico(this.servicoSelecionado.id, dados, token).subscribe({
        next: () => {
          this.fecharModal();
          this.carregarServicos();
          alert('Serviço atualizado com sucesso!');
        },
        error: () => alert('Erro ao atualizar serviço'),
      });
    }
  }


  deletarServico(id: number): void {
    if (confirm('Deseja mesmo excluir este serviço?')) {
      this.api.removerServico(id, this.token).subscribe({
        next: () => {
          this.carregarServicos();
          alert('Serviço excluído!');
        },
        error: () => alert('Erro ao excluir serviço'),
      });
    }
  }
}
