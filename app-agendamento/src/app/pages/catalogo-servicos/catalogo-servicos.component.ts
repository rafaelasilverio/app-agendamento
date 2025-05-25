import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CardsCatalogoServicosComponent } from '../../components/cards-catalogo-servicos/cards-catalogo-servicos.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-catalogo-servicos',
  imports: [CommonModule, CardsCatalogoServicosComponent],
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
      imagem: 'https://via.placeholder.com/600x400',
      titulo: 'Consultoria de Marketing',
      descricao: 'Ajudamos a expandir o seu negócio com estratégias modernas e eficientes.',
      preco: 'R$ 200,00',
      prestador: 'Agência XYZ',
      diasDisponiveis: 'Segunda a Sexta',
      cargaHoraria: '4h/dia',
      duracao: '1 semana',
      tipoAtendimento: 'Online',
      local: 'Remoto'
    },
    {
      imagem: 'https://via.placeholder.com/600x400',
      titulo: 'Manutenção de Computadores',
      descricao: 'Serviço especializado em manutenção, upgrades e suporte técnico.',
      preco: 'R$ 150,00',
      prestador: 'Carlos Técnico',
      diasDisponiveis: 'Segunda a Sábado',
      cargaHoraria: '6h/dia',
      duracao: 'Sob demanda',
      tipoAtendimento: 'Presencial',
      local: 'A domicílio'
    },
    {
      imagem: 'https://via.placeholder.com/600x400',
      titulo: 'Design Gráfico',
      descricao: 'Criação de logos, banners, material publicitário e identidade visual.',
      preco: 'R$ 180,00',
      prestador: 'Estúdio Criativo',
      diasDisponiveis: 'Todos os dias',
      cargaHoraria: 'Variável',
      duracao: 'Por projeto',
      tipoAtendimento: 'Online',
      local: 'Remoto'
    },
    {
      imagem: 'https://via.placeholder.com/600x400',
      titulo: 'Aulas de Inglês Online',
      descricao: 'Aprenda inglês com professores qualificados sem sair de casa.',
      preco: 'R$ 80,00/hora',
      prestador: 'Teacher Ana',
      diasDisponiveis: 'Segunda a Sexta',
      cargaHoraria: '1h/sessão',
      duracao: '3 meses',
      tipoAtendimento: 'Online',
      local: 'Remoto'
    },
    {
      imagem: 'https://via.placeholder.com/600x400',
      titulo: 'Serviços de Pintura',
      descricao: 'Pintura residencial e comercial com acabamento profissional.',
      preco: 'R$ 300,00',
      prestador: 'João Pintor',
      diasDisponiveis: 'Segunda a Sábado',
      cargaHoraria: '8h/dia',
      duracao: '2 dias',
      tipoAtendimento: 'Presencial',
      local: 'A domicílio'
    },
    {
      imagem: 'https://via.placeholder.com/600x400',
      titulo: 'Instalação de Antenas',
      descricao: 'Instalação de antenas parabólicas e digitais com equipamentos inclusos.',
      preco: 'R$ 250,00',
      prestador: 'Tech Antenas',
      diasDisponiveis: 'Segunda a Sexta',
      cargaHoraria: '3h',
      duracao: '1 dia',
      tipoAtendimento: 'Presencial',
      local: 'A domicílio'
    },
    {
      imagem: 'https://via.placeholder.com/600x400',
      titulo: 'Diarista Profissional',
      descricao: 'Limpeza completa residencial ou comercial com responsabilidade.',
      preco: 'R$ 120,00/dia',
      prestador: 'Maria Diarista',
      diasDisponiveis: 'Terça a Sábado',
      cargaHoraria: '8h/dia',
      duracao: '1 dia',
      tipoAtendimento: 'Presencial',
      local: 'A domicílio'
    },
    {
      imagem: 'https://via.placeholder.com/600x400',
      titulo: 'Consultoria Financeira',
      descricao: 'Organize suas finanças pessoais ou empresariais com especialistas.',
      preco: 'R$ 220,00',
      prestador: 'Contas em Dia',
      diasDisponiveis: 'Segunda a Sexta',
      cargaHoraria: '1h/sessão',
      duracao: '1 mês',
      tipoAtendimento: 'Online',
      local: 'Remoto'
    }
  ];

  agendarServico(servico: any) {
    const user = localStorage.getItem('user');

    if (user) {
      this.router.navigate(['/my-schedules'], {
        state: {
          servico: {
            id: 0,
            servico: servico.titulo,
            descricao: servico.descricao,
            imagem: servico.imagem,
            preco: servico.preco,
            prestador: servico.prestador,
            data: new Date().toISOString(),
            horario: '09:00',
            status: 'pendente',
            categoria: 'Serviço',
            calendario: servico.diasDisponiveis?.split(',') ?? [],
            horarioAtendimento: { inicio: '09:00', fim: '17:00' },
            tempoEstimado: servico.duracao ?? '',
            tipoAtendimento: servico.tipoAtendimento ?? '',
            endereco: servico.local ?? '',
            contato: 'contato@fornecedor.com',
            metodosPagamento: ['Pix', 'Cartão']
          }
        }
      });
    } else {
      this.router.navigate(['/register-choice']);
    }
  }

}
