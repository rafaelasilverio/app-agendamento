import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CardsAgendamentosComponent } from '../../../../components/cards-agendamentos/cards-agendamentos.component';
import { ModalCancelarAgendamentoComponent } from './modal-cancelar-agendamento/modal-cancelar-agendamento.component';
import { Agendamento } from './models/agendamento.model';

@Component({
  selector: 'app-tela-meus-agendamentos',
  standalone: true,
  imports: [CommonModule, CardsAgendamentosComponent, ModalCancelarAgendamentoComponent],
  templateUrl: './tela-meus-agendamentos.component.html',
  styleUrl: './tela-meus-agendamentos.component.scss'
})
export class TelaMeusAgendamentosComponent {
  modalVisivel = false;
  agendamentoSelecionadoId: number | null = null;

  agendamentos: Agendamento[] = [
    {
      id: 1,
      servico: 'Consultoria de Marketing',
      prestador: 'Agência XYZ',
      data: '2025-05-14',
      horario: '14:00',
      status: 'confirmado',
      descricao: 'Ajudamos a expandir o seu negócio com estratégias modernas e eficientes.',
      imagem: 'https://via.placeholder.com/600x400',
      preco: 'R$ 200,00',
      categoria: 'Marketing',
      calendario: ['Seg', 'Qua', 'Sex'],
      horarioAtendimento: { inicio: '08:00', fim: '18:00' },
      tempoEstimado: '01:00',
      tipoAtendimento: 'Local',
      endereco: 'Rua das Palmeiras, 123 - Centro - Marília/SP',
      contato: '(14) 99876-5432',
      metodosPagamento: ['Pix', 'Cartão', 'Dinheiro']
    }
  ]

  onCancelarAgendamento(id: number): void {
    this.modalVisivel = true;
    this.agendamentoSelecionadoId = id;
  }

  fecharModal(): void {
    this.modalVisivel = false;
    this.agendamentoSelecionadoId = null;
  }

  confirmarCancelamento(): void {
    if (this.agendamentoSelecionadoId !== null) {
      const agendamento = this.agendamentos.find(a => a.id === this.agendamentoSelecionadoId);
      if (agendamento) {
        agendamento.status = 'cancelado';
      }
    }
    this.fecharModal();
  }
}
