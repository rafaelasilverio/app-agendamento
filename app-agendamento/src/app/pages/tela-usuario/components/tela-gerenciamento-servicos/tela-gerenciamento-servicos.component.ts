import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarComponent } from '../../../../layout/sidebar/sidebar.component';
import { CardServicesComponent } from '../../../../components/card-services/card-services.component';

@Component({
  selector: 'app-tela-gerenciamento-servicos',
  imports: [CommonModule, SidebarComponent, CardServicesComponent],
  templateUrl: './tela-gerenciamento-servicos.component.html',
  styleUrl: './tela-gerenciamento-servicos.component.scss'
})
export class TelaGerenciamentoServicosComponent {
  servicos: any[] = [];

  constructor(private router: Router) { }

  ngOnInit() {
    // Simulação de carregamento de serviços (depois troque para API)
    this.servicos = [
      {
        id: 1,
        nome: 'Serviço A',
        descricao: 'Descrição do serviço A',
        categoria: 'Eletricista',
        preco: 150,
        pagamento: 'Pix, Cartão',
      },
      {
        id: 2,
        nome: 'Serviço B',
        descricao: 'Descrição do serviço B',
        categoria: 'Encanador',
        preco: 200,
        pagamento: 'Dinheiro',
      },
    ];
  }

  cadastrarServico() {
    this.router.navigate(['/register-service']);
  }

  editarServico(id: number) {
    console.log('ID para editar:', id);
    this.router.navigate(['/edit-services', id]);
  }

  deletarServico(id: number) {
    if (confirm('Tem certeza que deseja remover este serviço?')) {
      this.servicos = this.servicos.filter(s => s.id !== id);
    }
  }

}
