import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SidebarComponent } from '../../../../layout/sidebar/sidebar.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tela-editar-servico',
  imports: [CommonModule, SidebarComponent, ReactiveFormsModule],
  templateUrl: './tela-editar-servico.component.html',
  styleUrl: './tela-editar-servico.component.scss'
})
export class TelaEditarServicoComponent {
  formEditar!: FormGroup;
  servicoId!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.servicoId = Number(this.route.snapshot.paramMap.get('id'));

    // Mock de serviço recuperado (substituir por API no futuro)
    const servicoExistente = {
      id: this.servicoId,
      nome: 'Instalação de Antena Digital',
      descricao: 'Instalação completa de antena digital.',
      categoria: 'Instalador de Antenas',
      calendario: 'Seg, Ter, Qua, Qui, Sex',
      horario: '08:00 às 17:00',
      tempo: '01:30',
      tipoAtendimento: 'Domicílio',
      endereco: 'Rua das Flores, 123',
      cep: '12345-678',
      bairro: 'Centro',
      cidade: 'Marília',
      contato: '(14) 99999-9999',
      preco: 180,
      pagamento: 'Pix, Dinheiro',
    };

    this.formEditar = this.fb.group({
      nome: [servicoExistente.nome, Validators.required],
      descricao: [servicoExistente.descricao, Validators.required],
      categoria: [servicoExistente.categoria, Validators.required],
      calendario: [servicoExistente.calendario, Validators.required],
      horario: [servicoExistente.horario, Validators.required],
      tempo: [servicoExistente.tempo, Validators.required],
      tipoAtendimento: [servicoExistente.tipoAtendimento, Validators.required],
      endereco: [servicoExistente.endereco, Validators.required],
      cep: [servicoExistente.cep, Validators.required],
      bairro: [servicoExistente.bairro, Validators.required],
      cidade: [servicoExistente.cidade, Validators.required],
      contato: [servicoExistente.contato, Validators.required],
      preco: [servicoExistente.preco, Validators.required],
      pagamento: [servicoExistente.pagamento, Validators.required],
    });
  }

  salvarAlteracoes() {
    if (this.formEditar.valid) {
      console.log('Serviço atualizado:', this.formEditar.value);
      alert('Serviço atualizado com sucesso!');
      this.router.navigate(['/gerenciar-servicos']);
    } else {
      alert('Preencha todos os campos obrigatórios.');
    }
  }
}
