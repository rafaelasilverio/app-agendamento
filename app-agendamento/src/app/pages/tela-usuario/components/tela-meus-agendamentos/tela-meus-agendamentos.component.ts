import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, Navigation } from '@angular/router';
import { CardsAgendamentosComponent } from '../../../../components/cards-agendamentos/cards-agendamentos.component';
import { ModalCancelarAgendamentoComponent } from './modal-cancelar-agendamento/modal-cancelar-agendamento.component';
import { Agendamento } from './models/agendamento.model';
import { ApiService } from '../../../../../service/api.service';

@Component({
  selector: 'app-tela-meus-agendamentos',
  standalone: true,
  imports: [
    CommonModule,
    CardsAgendamentosComponent,
    ModalCancelarAgendamentoComponent
  ],
  templateUrl: './tela-meus-agendamentos.component.html',
  styleUrls: ['./tela-meus-agendamentos.component.scss']
})
export class TelaMeusAgendamentosComponent implements OnInit {
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
  ];

  constructor(
    private api: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (!token) return;

    this.api.buscarMeusAgendamentos(token).subscribe({
      next: (res) => {
        this.agendamentos = res.map(a => ({
          id: a.id,
          servico: a.service?.name || '',
          prestador: a.service?.provider?.name || '',
          data: a.date?.slice(0, 10),
          horario: a.date?.slice(11, 16),
          status: a.status?.toLowerCase() || 'pendente',
          descricao: a.description,
          imagem: a.service?.image,
          preco: a.service ? `R$ ${a.service.price}` : '',
          categoria: a.service?.category,
          calendario: [a.service?.availableDays],
          horarioAtendimento: { inicio: a.service?.dailyHours, fim: a.service?.dailyHours },
          tempoEstimado: a.service?.duration,
          tipoAtendimento: a.service?.attendanceType,
          endereco: a.service?.location,
          contato: a.service?.contact,
          metodosPagamento: Array.isArray(a.service?.paymentMethod)
            ? a.service?.paymentMethod
            : (typeof a.service?.paymentMethod === 'string' && a.service?.paymentMethod)
              ? a.service?.paymentMethod.split(',').map((m: string) => m.trim())
              : []
        }));
      },
      error: () => {
        this.agendamentos = [];
      }
    });
  }

  private processarStateDeNavegacao(): void {
    // Pega a navegação corrente e extrai o state safely
    const nav: Navigation | null = this.router.getCurrentNavigation();
    const state = nav?.extras.state as { servico?: any } | undefined;
    const novo = state?.servico;
    if (!novo) return;

    this.agendamentos.push({
      id: Date.now(),
      servico: novo.title,
      prestador: novo.provider,
      data: novo.date,
      horario: novo.date.substring(11, 16),
      status: 'pendente',
      descricao: novo.description,
      imagem: novo.image,
      preco: `R$ ${novo.price}`,
      categoria: novo.category ?? '',
      calendario: [novo.availableDays],
      horarioAtendimento: { inicio: novo.dailyHours, fim: novo.dailyHours },
      tempoEstimado: novo.duration,
      tipoAtendimento: novo.attendanceType,
      endereco: novo.location,
      contato: novo.contact ?? '',
      metodosPagamento: novo.paymentMethod ?? []
    });
  }

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
      const token = localStorage.getItem('token');
      if (!token) return;

      this.api.cancelarAgendamento(this.agendamentoSelecionadoId, token).subscribe({
        next: () => {
          this.agendamentos = this.agendamentos.map(a =>
            a.id === this.agendamentoSelecionadoId ? { ...a, status: 'cancelado' } : a
          );
          this.fecharModal();
        },
        error: () => {
          alert('Erro ao cancelar agendamento.');
          this.fecharModal();
        }
      });
    }
  }

}
