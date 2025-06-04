import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
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
  diasDaSemana: string[] = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
  tiposAtendimento: string[] = ['Somente local', 'Atendimento à Domicilio', 'Atendimento Online'];
  formasPagamento: string[] = ['Pix', 'Cartão de Crédito', 'Dinheiro'];

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
    this.diasSelecionados = servico?.availableDays?.split(', ') || [];
    let horaInicio = '', horaFim = '';
    if (servico?.dailyHours) {
      const partes = servico.dailyHours.split(' às ');
      horaInicio = partes[0] || '';
      horaFim = partes[1] || '';
    }

    this.previewUrls = [];
    this.formServico = this.fb.group({
      name: [servico?.name || ''],
      description: [servico?.description || ''],
      category: [servico?.category || ''],
      availableDays: [this.diasSelecionados.join(', ')],
      horaInicio: [horaInicio],
      horaFim: [horaFim],
      duration: [servico?.duration || ''],
      attendanceType: [servico?.attendanceType || ''],
      location: [servico?.location || ''],
      cep: [servico?.cep || ''],
      neighborhood: [servico?.neighborhood || ''],
      city: [servico?.city || ''],
      contact: [servico?.contact || ''],
      price: [servico?.price ? this.formatarValorReais(servico.price) : ''],
      paymentMethod: [servico?.paymentMethod || ''],
      image: [servico?.image || '']
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
      availableDays: this.diasSelecionados.join(', ')
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
    const formValues = this.formServico.value;
    const precoConvertido = parseFloat((formValues.price || '0').toString().replace(/\./g, '').replace(',', '.'));

    const payload = {
      name: formValues.name,
      description: formValues.description,
      category: formValues.category,
      availableDays: this.diasSelecionados.join(', '),
      dailyHours: `${formValues.horaInicio} às ${formValues.horaFim}`,
      duration: formValues.duration,
      attendanceType: formValues.attendanceType,
      location: formValues.location,
      cep: formValues.cep,
      neighborhood: formValues.neighborhood,
      city: formValues.city,
      contact: formValues.contact,
      price: isNaN(precoConvertido) ? 0 : precoConvertido,
      paymentMethod: formValues.paymentMethod,
      image: formValues.image
    };

    this.salvar.emit(payload);
  }
}
