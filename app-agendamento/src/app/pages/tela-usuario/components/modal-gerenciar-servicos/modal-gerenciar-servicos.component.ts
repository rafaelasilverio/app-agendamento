import {
  Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges, ChangeDetectorRef
} from '@angular/core';
import {
  CommonModule
} from '@angular/common';
import {
  FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, FormControl
} from '@angular/forms';
import { ModalComponent } from '../../../../components/modal/modal.component';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-modal-gerenciar-servicos',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ModalComponent,
    NgxMaskDirective,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule
  ],
  providers: [
    provideNgxMask(),
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }
  ],
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

  tiposAtendimento: string[] = ['Somente local', 'Atendimento à Domicilio', 'Atendimento Online'];
  formasPagamento: string[] = ['Pix', 'Cartão de Crédito', 'Dinheiro'];

  selectedFiles: File[] = [];
  previewUrls: string[] = [];

  diasCalendarioSelecionados: Date[] = [];
  diasCalendarioControl = new FormControl<Date | null>(null);

  diasDaSemana: string[] = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  diasSelecionados: string[] = [];

  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.inicializarFormulario(this.servicoSelecionado);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['servicoSelecionado'] && !changes['servicoSelecionado'].firstChange) {
      this.inicializarFormulario(this.servicoSelecionado);
    }
  }

  inicializarFormulario(servico: any = null): void {
    this.previewUrls = [];
    if (servico?.availableDays && /^[A-Za-zÀ-ú, ]+$/.test(servico.availableDays)) {
      this.diasSelecionados = servico.availableDays.split(',').map((d: string) => d.trim());
    } else {
      this.diasSelecionados = [];
    }
    this.diasCalendarioSelecionados = [];
    this.diasCalendarioControl.setValue(null);

    let horaInicio = '', horaFim = '';
    if (servico?.dailyHours) {
      const partes = servico.dailyHours.split(' às ');
      horaInicio = partes[0] || '';
      horaFim = partes[1] || '';
    }

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
      cep: [servico?.cep ? String(servico.cep) : ''],
      neighborhood: [servico?.neighborhood || ''],
      city: [servico?.city || ''],
      contact: [servico?.contact ? String(servico.contact) : ''],
      price: [servico?.price !== undefined && servico?.price !== null ? this.formatarValorReais(servico.price) : ''],
      paymentMethod: [servico?.paymentMethod || ''],
      image: [servico?.image || '']
    });
    // Força detecção de mudanças para garantir atualização dos campos
    this.cdr.detectChanges();
  }

  // Seleção múltipla de dias
  onDiasCalendarioChange(val: Date | null) {
    if (!val) return;
    const existe = this.diasCalendarioSelecionados.some(d =>
      d.getDate() === val.getDate() &&
      d.getMonth() === val.getMonth() &&
      d.getFullYear() === val.getFullYear()
    );
    if (!existe) {
      this.diasCalendarioSelecionados.push(val);
    } else {
      this.diasCalendarioSelecionados = this.diasCalendarioSelecionados.filter(d =>
        !(d.getDate() === val.getDate() && d.getMonth() === val.getMonth() && d.getFullYear() === val.getFullYear())
      );
    }
    this.formServico.patchValue({
      availableDays: this.diasCalendarioSelecionados.map(d => d.toISOString().split('T')[0]).join(', ')
    });
    // Limpa o input do datepicker para múltipla seleção
    this.diasCalendarioControl.setValue(null);
  }

  alternarDia(dia: string) {
    const idx = this.diasSelecionados.indexOf(dia);
    if (idx === -1) {
      this.diasSelecionados.push(dia);
    } else {
      this.diasSelecionados.splice(idx, 1);
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
    // Corrigir parse do preço para número
    let precoConvertido = 0;
    if (typeof formValues.price === 'string') {
      precoConvertido = parseFloat(formValues.price.replace(/\./g, '').replace(',', '.'));
    } else if (typeof formValues.price === 'number') {
      precoConvertido = formValues.price;
    }
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
