import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CardsCatalogoServicosComponent } from '../../components/cards-catalogo-servicos/cards-catalogo-servicos.component';
import { ServicoDetalhesModalComponent } from '../../components/servico-detalhes-modal/servico-detalhes-modal.component';
import { ApiService } from '../../../service/api.service';
import { ConfimarAgendamentoModalComponent } from '../../components/confimar-agendamento-modal/confimar-agendamento-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogSuccessComponent } from '../../components/dialog-success/dialog-success.component';

interface Servico {
  id: number;
  image: string;
  images: string[];
  name: string;
  description: string;
  category: string;
  availableDays: string;
  dailyHours: string;
  duration: string;
  attendanceType: string;
  location: string;
  cep: string;
  neighborhood: string;
  city: string;
  contact: string;
  price: string;
  paymentMethod: string;
  provider: string;
  agendado?: boolean;
}

@Component({
  selector: 'app-catalogo-servicos',
  standalone: true,
  imports: [
    CommonModule,
    CardsCatalogoServicosComponent,
    ServicoDetalhesModalComponent,
    ConfimarAgendamentoModalComponent
  ],
  templateUrl: './catalogo-servicos.component.html',
  styleUrls: ['./catalogo-servicos.component.scss']
})
export class CatalogoServicosComponent implements OnInit, OnDestroy {
  servicos: Servico[] = [];
  servicosFiltrados: Servico[] = [];
  selectedServico: Servico | null = null;
  modalVisivel = false;
  modalAgendarVisivel = false;
  servicoParaAgendar: Servico | null = null;
  private navbarSearchListener: any;
  mensagemErroBusca: string = '';

  constructor(
    private router: Router,
    private api: ApiService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token') || '';
    this.api.buscarTodosServicos().subscribe(res => {
      this.api.buscarMeusAgendamentos(token).subscribe(agendamentos => {
        const idsAgendados = agendamentos
          .filter((a: any) => a.status?.toLowerCase() !== 'cancelado')
          .map((a: any) => a.service.id);

        this.servicos = res.map(s => ({
          id: s.id,
          image: s.image,
          images: [s.image],
          name: s.name,
          description: s.description,
          category: s.category,
          availableDays: s.availableDays,
          dailyHours: s.dailyHours,
          duration: s.duration,
          attendanceType: s.attendanceType,
          location: s.location,
          cep: s.cep,
          neighborhood: s.neighborhood,
          city: s.city,
          contact: s.contact,
          price: s.price.toFixed(2),
          paymentMethod: s.paymentMethod,
          provider: s.provider.name,
          agendado: idsAgendados.includes(s.id)
        }));
        this.servicosFiltrados = [...this.servicos];
        // Se veio termo de busca do navbar, filtra já
        const nav = window.history.state;
        if (nav && nav.termoBusca) {
          this.filtrarServicos(nav.termoBusca);
        }
      });
    });
    // Escuta evento global de busca do navbar
    this.navbarSearchListener = (e: any) => {
      this.filtrarServicos(e.detail);
    };
    window.addEventListener('navbar-search', this.navbarSearchListener);
  }

  ngOnDestroy(): void {
    window.removeEventListener('navbar-search', this.navbarSearchListener);
  }

  filtrarServicos(termo: string) {
    if (!termo || termo.trim() === '') {
      this.servicosFiltrados = [...this.servicos];
      this.mensagemErroBusca = '';
      // Limpa o campo de busca do navbar
      window.dispatchEvent(new CustomEvent('navbar-clear-search'));
      return;
    }
    const termoLower = termo.toLowerCase();
    this.servicosFiltrados = this.servicos.filter(s => s.name.toLowerCase().includes(termoLower));
    // Limpa o campo de busca do navbar após buscar
    window.dispatchEvent(new CustomEvent('navbar-clear-search'));
    if (this.servicosFiltrados.length === 0) {
      this.mensagemErroBusca = 'Nenhum serviço encontrado para sua busca.';
    } else {
      this.mensagemErroBusca = '';
    }
  }

  openModal(servico: Servico): void {
    this.selectedServico = servico;
    this.modalVisivel = true;
  }

  closeModal(): void {
    this.modalVisivel = false;
    this.selectedServico = null;
  }

  agendarServico(servico: Servico, dataHora: string): void {
    if (servico.agendado) return;
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (!user || !token) {
      this.router.navigate(['/register-choice']);
      return;
    }

    const agendamento = {
      title: servico.name,
      description: servico.description,
      date: dataHora,
      serviceId: servico.id
    };

    this.api.agendarServico(agendamento, token).subscribe({
      next: () => {
        servico.agendado = true;
        this.selectedServico = { ...servico };
        alert('Agendamento realizado com sucesso!');
      },
      error: () => {
        alert('Erro ao agendar. Tente novamente.');
      }
    });
  }

  cancelarAgendamentoServico(servico: Servico): void {
    const token = localStorage.getItem('token');
    if (!token) return;

    this.api.buscarMeusAgendamentos(token).subscribe(res => {
      const agendamento = res.find((a: any) => a.service.id === servico.id && a.status?.toLowerCase() !== 'cancelado');
      if (agendamento) {
        this.api.cancelarAgendamento(agendamento.id, token).subscribe({
          next: () => {
            servico.agendado = false;
            this.selectedServico = { ...servico };
            alert('Serviço cancelado!');
          },
          error: () => alert('Erro ao cancelar o serviço.')
        });
      } else {
        alert('Nenhum agendamento ativo para este serviço.');
      }
    });
  }

  abrirModalAgendar(servico: Servico) {
    if (servico.agendado) return;
    this.servicoParaAgendar = servico;
    this.modalAgendarVisivel = true;
  }

  onConfirmarAgendamento(dataHora: string) {
    this.modalAgendarVisivel = false;
    if (!this.servicoParaAgendar) return;
    this.agendarServico(this.servicoParaAgendar, dataHora);
    this.servicoParaAgendar = null;
  }

  // Corrige a extração do horário
  getHorarioInicio(dailyHours: string): string {
    if (!dailyHours) return '00:00';
    const parts = dailyHours.split(' às ');
    return (parts[0] || '00:00').trim();
  }

  getHorarioFim(dailyHours: string): string {
    if (!dailyHours) return '23:59';
    const parts = dailyHours.split(' às ');
    return (parts[1] || '23:59').trim();
  }

  onInputBusca(event: Event) {
    const value = (event.target as HTMLInputElement)?.value || '';
    this.filtrarServicos(value);
  }
}
