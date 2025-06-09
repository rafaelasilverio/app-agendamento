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

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      data: ['', Validators.required],
      hora: ['', Validators.required]
    });
    this.hojeISO = new Date().toISOString().slice(0, 10);

    this.diasDisponiveisArray = this.diasDisponiveis
      ? this.diasDisponiveis.split(',').map(d => d.trim().toLowerCase())
      : [];
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
