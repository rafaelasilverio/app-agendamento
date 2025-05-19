import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CardServicesComponent } from '../../../../components/card-services/card-services.component';
import { ModalGerenciarServicosComponent } from '../modal-gerenciar-servicos/modal-gerenciar-servicos.component';

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

  ngOnInit(): void {
    this.listarServicos = [
      {
        id: 1,
        nome: 'Serviço A',
        descricao: 'Manutenção elétrica residencial',
        categoria: 'Eletricista',
        preco: 150,
        pagamento: 'Pix, Cartão',
        imagem: 'https://via.placeholder.com/150',
        calendario: 'Seg a Sex',
        horario: '08:00 - 18:00',
        tempo: '1h',
        tipoAtendimento: 'Presencial',
        endereco: 'Rua das Flores',
        bairro: 'Centro',
        cidade: 'São Paulo',
        cep: '01000-000',
        contato: '(11) 99999-9999'
      },
      {
        id: 2,
        nome: 'Serviço B',
        descricao: 'Desentupimento e manutenção hidráulica',
        categoria: 'Encanador',
        preco: 200,
        pagamento: 'Dinheiro',
        imagem: 'https://via.placeholder.com/150',
        calendario: 'Seg a Sáb',
        horario: '09:00 - 17:00',
        tempo: '2h',
        tipoAtendimento: 'Presencial',
        endereco: 'Av. Brasil',
        bairro: 'Jardins',
        cidade: 'São Paulo',
        cep: '01400-000',
        contato: '(11) 98888-8888'
      }
    ];
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

  salvarServico(servico: any): void {
    if (this.modo === 'criar') {
      const novoServico = { ...servico, id: Date.now() };
      this.listarServicos.push(novoServico);
      alert('Serviço cadastrado com sucesso!');
    } else {
      this.listarServicos = this.listarServicos.map(s =>
        s.id === this.servicoSelecionado.id ? { ...s, ...servico } : s
      );
      alert('Serviço atualizado com sucesso!');
    }

    this.fecharModal();
  }

  deletarServico(id: number): void {
    const confirmacao = confirm('Tem certeza que deseja remover este serviço?');
    if (confirmacao) {
      this.listarServicos = this.listarServicos.filter(s => s.id !== id);
    }
  }
}
