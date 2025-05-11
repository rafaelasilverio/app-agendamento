import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CardsCatalogoServicosComponent } from '../../components/cards-catalogo-servicos/cards-catalogo-servicos.component';

@Component({
  selector: 'app-catalogo-servicos',
  imports: [CommonModule, CardsCatalogoServicosComponent],
  templateUrl: './catalogo-servicos.component.html',
  styleUrl: './catalogo-servicos.component.scss'
})
export class CatalogoServicosComponent {
  servicos = [
    {
      imagem: 'https://via.placeholder.com/600x400',
      titulo: 'Consultoria de Marketing',
      descricao: 'Ajudamos a expandir o seu negócio com estratégias modernas e eficientes.',
      preco: 'R$ 200,00',
      prestador: 'Agência XYZ'
    },
    {
      imagem: 'https://via.placeholder.com/600x400',
      titulo: 'Manutenção de Computadores',
      descricao: 'Serviço especializado em manutenção, upgrades e suporte técnico.',
      preco: 'R$ 150,00',
      prestador: 'Carlos Técnico'
    },
    {
      imagem: 'https://via.placeholder.com/600x400',
      titulo: 'Design Gráfico',
      descricao: 'Criação de logos, banners, material publicitário e identidade visual.',
      preco: 'R$ 180,00',
      prestador: 'Estúdio Criativo'
    },
    {
      imagem: 'https://via.placeholder.com/600x400',
      titulo: 'Aulas de Inglês Online',
      descricao: 'Aprenda inglês com professores qualificados sem sair de casa.',
      preco: 'R$ 80,00/hora',
      prestador: 'Teacher Ana'
    },
    {
      imagem: 'https://via.placeholder.com/600x400',
      titulo: 'Serviços de Pintura',
      descricao: 'Pintura residencial e comercial com acabamento profissional.',
      preco: 'R$ 300,00',
      prestador: 'João Pintor'
    },
    {
      imagem: 'https://via.placeholder.com/600x400',
      titulo: 'Instalação de Antenas',
      descricao: 'Instalação de antenas parabólicas e digitais com equipamentos inclusos.',
      preco: 'R$ 250,00',
      prestador: 'Tech Antenas'
    },
    {
      imagem: 'https://via.placeholder.com/600x400',
      titulo: 'Diarista Profissional',
      descricao: 'Limpeza completa residencial ou comercial com responsabilidade.',
      preco: 'R$ 120,00/dia',
      prestador: 'Maria Diarista'
    },
    {
      imagem: 'https://via.placeholder.com/600x400',
      titulo: 'Consultoria Financeira',
      descricao: 'Organize suas finanças pessoais ou empresariais com especialistas.',
      preco: 'R$ 220,00',
      prestador: 'Contas em Dia'
    }
  ];
}
