import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalComponent } from '../../../../components/modal/modal.component';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-modal-gerenciar-servicos',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ModalComponent,
    NgxMaskDirective,
    NgxMaskPipe
  ],
  providers: [provideNgxMask()],
  templateUrl: './modal-gerenciar-servicos.component.html',
  styleUrl: './modal-gerenciar-servicos.component.scss'
})
export class ModalGerenciarServicosComponent implements OnInit, OnChanges {
  @Input() visivel: boolean = false;
  @Input() modo: 'criar' | 'editar' = 'criar';
  @Input() servicoSelecionado: any = null;

  @Output() fechar = new EventEmitter<void>();
  @Output() cancelar = new EventEmitter<void>();
  @Output() salvar = new EventEmitter<any>();

  formServico!: FormGroup;

  diasSelecionados: string[] = [];
  diasDaSemana: string[] = [
    'Domingo',
    'Segunda',
    'Terça',
    'Quarta',
    'Quinta',
    'Sexta',
    'Sábado'
  ];

  tiposAtendimento: string[] = [
    'Somente local',
    'Atendimento à Domicilio',
    'Atendimento Online'
  ];

  formasPagamento: string[] = ['Pix', 'Cartão de Crédito', 'Dinheiro'];

  horaInicio: string = '';
  horaFim: string = '';

  selectedFiles: File[] = [];
  previewUrls: string[] = [];

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.inicializarFormulario(this.servicoSelecionado);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['servicoSelecionado'] && !changes['servicoSelecionado'].firstChange) {
      this.inicializarFormulario(this.servicoSelecionado);
    }
  }

  inicializarFormulario(servico: any = null): void {
    this.diasSelecionados = servico?.calendario?.split(', ') || [];

    if (servico?.horario) {
      const partes = servico.horario.split(' às ');
      this.horaInicio = partes[0] || '';
      this.horaFim = partes[1] || '';
    } else {
      this.horaInicio = '';
      this.horaFim = '';
    }

    this.previewUrls = [];

    this.formServico = this.fb.group({
      nome: [servico?.nome || '', Validators.required],
      descricao: [servico?.descricao || '', Validators.required],
      categoria: [servico?.categoria || '', Validators.required],
      calendario: [this.diasSelecionados.join(', '), Validators.required],
      horario: ['', Validators.required],
      tempo: [servico?.tempo || '', Validators.required],
      tipoAtendimento: [servico?.tipoAtendimento || '', Validators.required],
      endereco: [servico?.endereco || '', Validators.required],
      cep: [servico?.cep || '', Validators.required],
      bairro: [servico?.bairro || '', Validators.required],
      cidade: [servico?.cidade || '', Validators.required],
      contato: [servico?.contato || '', Validators.required],
      preco: [servico?.preco ? this.formatarValorReais(servico.preco) : '', Validators.required],
      pagamento: [servico?.pagamento || '', Validators.required],
      imagem: [servico?.imagem || '', Validators.required]
    });
  }

  alternarDia(dia: string): void {
    const index = this.diasSelecionados.indexOf(dia);
    if (index >= 0) {
      this.diasSelecionados.splice(index, 1);
    } else {
      this.diasSelecionados.push(dia);
    }

    this.formServico.patchValue({
      calendario: this.diasSelecionados.join(', ')
    });
  }

  formatarValorReais(valor: number | string): string {
    if (typeof valor === 'string') {
      valor = parseFloat(valor.replace(/\./g, '').replace(',', '.'));
    }
    if (isNaN(valor)) return '0,00';
    return valor.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  onFileChange(event: any): void {
    const files = event.target.files;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      this.selectedFiles.push(file);

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewUrls.push(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }

  removerImagem(index: number): void {
    this.selectedFiles.splice(index, 1);
    this.previewUrls.splice(index, 1);
  }

  fecharModal(): void {
    this.fechar.emit();
  }

  cancelarModal(): void {
    this.cancelar.emit();
  }

  salvarServico(): void {
    if (!this.horaInicio || !this.horaFim) {
      alert('Informe os dois horários de atendimento.');
      return;
    }

    const horarioCompleto = `${this.horaInicio} às ${this.horaFim}`;
    this.formServico.patchValue({ horario: horarioCompleto });

    // Converte string do preço formatado para número
    const precoBr = this.formServico.value.preco; // ex: "1.234,50"
    const precoConvertido = parseFloat(precoBr.replace(/\./g, '').replace(',', '.'));
    this.formServico.patchValue({ preco: precoConvertido });

    if (this.formServico.invalid) {
      alert('Preencha todos os campos obrigatórios!');
      return;
    }

    const dados = {
      ...this.formServico.value,
      diasSelecionados: this.diasSelecionados,
      imagens: this.selectedFiles
    };

    this.salvar.emit(dados);
  }
}
