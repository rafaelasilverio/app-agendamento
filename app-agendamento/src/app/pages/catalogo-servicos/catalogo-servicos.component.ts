import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CardsCatalogoServicosComponent } from '../../components/cards-catalogo-servicos/cards-catalogo-servicos.component';
import { ServicoDetalhesModalComponent } from '../../components/servico-detalhes-modal/servico-detalhes-modal.component';
import { ApiService } from '../../../service/api.service';

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
}

@Component({
  selector: 'app-catalogo-servicos',
  standalone: true,
  imports: [
    CommonModule,
    CardsCatalogoServicosComponent,
    ServicoDetalhesModalComponent
  ],
  templateUrl: './catalogo-servicos.component.html',
  styleUrls: ['./catalogo-servicos.component.scss']
})
export class CatalogoServicosComponent implements OnInit {
  servicos: Servico[] = [];
  selectedServico: Servico | null = null;
  modalVisivel = false;

  constructor(
    private router: Router,
    private api: ApiService
  ) { }

  ngOnInit(): void {
    this.api.buscarTodosServicos().subscribe(res => {
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
        provider: s.provider.name
      }));
    });
  }

  openModal(servico: Servico): void {
    this.selectedServico = servico;
    this.modalVisivel = true;
  }

  closeModal(): void {
    this.modalVisivel = false;
    this.selectedServico = null;
  }

  agendarServico(servico: Servico): void {
    const user = localStorage.getItem('user');
    if (!user) {
      // visitante sem login
      this.router.navigate(['/register-choice']);
      return;
    }
    // usuário logado segue para agendar
    this.router.navigate(['/user/my-schedules'], {
      state: {
        servico: {
          title: servico.name,
          description: servico.description,
          image: servico.image,
          price: servico.price,
          provider: servico.provider,
          category: servico.category,
          availableDays: servico.availableDays,
          dailyHours: servico.dailyHours,
          duration: servico.duration,
          attendanceType: servico.attendanceType,
          location: servico.location,
          cep: servico.cep,
          neighborhood: servico.neighborhood,
          city: servico.city,
          contact: servico.contact,
          paymentMethod: servico.paymentMethod
        }
      }
    });
  }
}
