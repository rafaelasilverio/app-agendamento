import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confimar-agendamento-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './confimar-agendamento-modal.component.html',
  styleUrls: ['./confimar-agendamento-modal.component.scss']
})
export class ConfimarAgendamentoModalComponent implements OnInit {
  @Input() visivel: boolean = false;
  @Input() diasDisponiveis: string = '';
  @Input() horarioInicio: string = '00:00';
  @Input() horarioFim: string = '23:59';
  @Output() confirmar = new EventEmitter<string>();
  @Output() fechar = new EventEmitter<void>();

  form!: FormGroup;
  hojeISO: string = '';

  diasDisponiveisArray: string[] = [];
  diasDisponiveisSelect: { label: string, value: string }[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      data: ['', Validators.required],
      hora: ['', Validators.required]
    });
    this.hojeISO = new Date().toISOString().slice(0, 10);

    this.diasDisponiveisArray = this.diasDisponiveis
      ? this.diasDisponiveis.split(',').map(d => d.trim().toLowerCase().slice(0,3))
      : [];

    // Gera os próximos 30 dias que batem com os dias disponíveis
    const diasSemana = [
      'dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'
    ];
    const hoje = new Date();
    this.diasDisponiveisSelect = [];
    for (let i = 0; i < 30; i++) {
      const data = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate() + i);
      const diaSemana = diasSemana[data.getDay()];
      if (this.diasDisponiveisArray.includes(diaSemana)) {
        const value = data.toISOString().slice(0, 10);
        const label = `${data.toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' })}`;
        this.diasDisponiveisSelect.push({ label, value });
      }
    }

    // Ajusta o horário mínimo e máximo do input de hora conforme selecionado
    this.form.get('data')?.valueChanges.subscribe((dataSelecionada: string) => {
      if (!dataSelecionada) return;
      // O horário já está limitado pelo [min] e [max] no template, mas pode-se ajustar aqui se quiser gerar opções
      // Exemplo: gerar horários de 30 em 30 minutos
      // (pode ser implementado se desejar)
    });
  }

  onClose() {
    this.fechar.emit();
    this.form.reset();
  }

  onConfirmar() {
    const data = this.form.value.data;
    const hora = this.form.value.hora;
    if (data && hora) {
      this.confirmar.emit(`${data}T${hora}`);
      this.form.reset();
    }
  }

  isDiaPermitido(): boolean {
    if (!this.form.value.data) return true;
    const data = new Date(this.form.value.data + 'T00:00');
    const dias = [
      'domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'
    ];
    const diaSemana = dias[data.getDay()];
    return this.diasDisponiveisArray.includes(diaSemana);
  }
}
