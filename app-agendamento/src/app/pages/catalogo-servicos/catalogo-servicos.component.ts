import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CardsCatalogoServicosComponent } from '../../components/cards-catalogo-servicos/cards-catalogo-servicos.component';
import { Router } from '@angular/router';
import { ServicoDetalhesModalComponent } from '../../components/servico-detalhes-modal/servico-detalhes-modal.component';

@Component({
  selector: 'app-catalogo-servicos',
  standalone: true,
  imports: [CommonModule, CardsCatalogoServicosComponent, ServicoDetalhesModalComponent],
  templateUrl: './catalogo-servicos.component.html',
  styleUrl: './catalogo-servicos.component.scss'
})

export class CatalogoServicosComponent implements OnInit {
  // servicos: any[] = [];

  constructor(
    private router: Router,
    // private serviceService: ServiceService
  ) { }

  ngOnInit(): void {
    // this.serviceService.getAll().subscribe((res: any) => {
    //   this.servicos = res;
    // });
  }

  servicos = [
    {
      image: 'https://via.placeholder.com/600x400',
      name: 'Consultoria de Marketing',
      description: 'Ajudamos a expandir o seu negócio…',
      price: '200',            // sem “R$”, só número
      provider: 'Agência XYZ',
      availableDays: 'Segunda a Sexta',
      dailyHours: '4h/dia',
      duration: '1 semana',
      attendanceType: 'Online',
      location: 'Remoto'
    },
  ];

  agendarServico(servico: any) {
    const user = localStorage.getItem('user');
    if (!user) {
      // usuário não logado
      this.router.navigate(['/register-choice']);
    } else {
      // já existe usuário → mantém a navegação que salva no estado
      this.router.navigate(['/user/my-schedules'], {
        state: {
          servico: {
            serviceId: servico.id,     // se existir id
            title: servico.name,
            description: servico.description,
            date: new Date().toISOString(),
            // ... demais campos mapeados em inglês
          }
        }
      });
    }

  }

  selectedServico: any = null;
  modalVisivel = false;

  openModal(servico: any) {
    this.selectedServico = servico;
    this.modalVisivel = true;
  }
  closeModal() {
    this.selectedServico = null;
    this.modalVisivel = false;
  }


}
